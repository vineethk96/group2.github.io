/**
 * File Name: mapPage.js
 * Author: Vineeth Kirandumkara
 * Date: 06/01/25
 * Description: Javascript file for the MapPage
 */

var map;
var mapWindow;
let markers = [];
const BIRD_CLASS = 'Aves';
const LONDON_LAT = 51.5074;
const LONDON_LONG = -0.1278;
const RADIUS_KM = 50;

document.addEventListener('DOMContentLoaded', async () => {

    // Connect to the API to get the GMaps API Key
    const keyResponse = await fetch('http://localhost:3000/api/key');
    const keyData = await keyResponse.json();
    const apiKey = keyData.apiKey;
    const script = document.createElement('script');

    // Pull the Map from the API
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);

    // Attach the event listener to the search and submit button
    const form = document.getElementById('searchForm');
    const input = document.getElementById('searchInput');

    // Wait for User to Submit a Search
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const query = input.value;

        if (query) {
            // Request the query filtered to only birds
            const speciesUrl = `https://species-ws.nbnatlas.org/search?q=&fq=commonName:${query}&fq=rk_class:Aves`;

            try {
                const speciesResponse = await fetch(speciesUrl);
                const speciesData = await speciesResponse.json();

                // Check if the call were successful, and are in an array format
                if (speciesData.searchResults.results && Array.isArray(speciesData.searchResults.results)) {
                    // Filter birds, and populate the table
                    const birdsWithinRadius = await filterAndPopulateTable(speciesData.searchResults.results);
                    // Populate the Table
                    //populateTable(birdsWithinRadius);
                } else {
                    console.error('Error: Incomplete Array', speciesData);
                }
            } catch (error) {
                console.error('Error: Invalid Return Data', error);
            }
        }
    });

    async function filterAndPopulateTable(query) {
        // Gets all the birds within a given radius of London (Takes way too much time)
        const allOccurrences = await fetchOccurrencesWithinRadius(LONDON_LAT, LONDON_LONG, RADIUS_KM);
        
        // Filter birds that match the search query
        const filteredBirds = allOccurrences.filter(occurrence => occurrence.commonName.includes(query));
    
        // Remove duplicates by scientific name
        const uniqueBirds = [...new Map(filteredBirds.map(bird => [bird.scientificName, bird])).values()];
    
        // Populates the table with the birds
        populateTable(uniqueBirds);
    }

    function populateTable(data){
        const dataTable = document.querySelector('#dataTable tbody');
        const tableBody = document.getElementById('tableBody');

        // Clear the previous data
        tableBody.innerHTML = '';

        // Update the table data
        data.forEach((item, index) => {

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.commonNameSingle}</td>
                <td>${item.scientificName}</td>
            `;
            row.addEventListener('click', () => selectRow(item.scientificName));
            tableBody.appendChild(row);
        });
    }

    function selectRow(sciName) {
        const rows = document.querySelectorAll('#dataTable tbody tr');
        
        // Deselect all rows
        rows.forEach(row => row.classList.remove('selected'));
    
        // Select the clicked row
        const selectedRow = Array.from(rows).find(row => row.cells[1].textContent === sciName);
        if (selectedRow) {
            selectedRow.classList.add('selected');
        }
    
        // Use the pre-fetched data to add markers
        addMarkersForBird(sciName, allOccurrences);
    }

    function addMarkersForBird(sciName, occurrences) {
        const birdOccurrences = occurrences.filter(occurrence => occurrence.scientificName === sciName);
    
        // Clear all the Markers
        deleteMarkers();
    
        // Add the new Markers
        birdOccurrences.forEach(sighting => {
            addMarker({ lat: sighting.decimalLatitude, lng: sighting.decimalLongitude });
        });
    }

    async function fetchOccurrencesWithinRadius(lat, lon, radius) {
        const url = `https://records-ws.nbnatlas.org/occurrences/search?q=class:${BIRD_CLASS}&lat=${lat}&lon=${lon}&radius=${radius}`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.occurrences;
        } catch (error) {
            console.error('Error fetching occurrences within radius', error);
            return [];
        }
    }

    // Function to add a marker
    function addMarker(location) {
        const marker = new google.maps.Marker({
            position: location,
            map: map, // The map instance
        });
        markers.push(marker); // Store the marker in the array
    }

    // Function to delete all markers
    function deleteMarkers() {
        for (let i = 0; i < markers.length; i++) {
            markers[i].setMap(null); // Remove the marker from the map
        }
        markers = []; // Clear the markers array
    }
});

function initMap(){
    // Create the GMaps Window
    mapWindow = new google.maps.InfoWindow({maxWidth: 300});

    // Sets the Map Defaults
    var mapOptions = {
        center: new google.maps.LatLng(51.514756, -0.104345),
        zoom: 14,
        styles: themedMap
    };

    // Open the GMap
    map = new google.maps.Map(document.getElementById("mapCanvas"), mapOptions);

    // Allow for the user to click and drag the map around
    google.maps.event.addListener(map, 'dragend', function() {
        var bounds = map.getBounds();
        console.log("SW: " + bounds.getSouthWest() + " NE: " + bounds.getNorthEast());
        console.log("Center: " + map.getCenter().lat() + ", " +  map.getCenter().lng());
    });
}

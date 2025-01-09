/**
 * File Name: mapPage.js
 * Author: Vineeth Kirandumkara
 * Date: 06/01/25
 * Description: Javascript file for the MapPage
 */

var map;
var mapWindow;

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
        event.preventDefault(); // Prevents default form submission. (COME BACK TO)
        const query = input.value;

        if(query){

            const url = `https://species-ws.nbnatlas.org/search?q=&fq=commonName:${query}'`

            try{
                // Get the data from the NBN Atlas API
                const searchResponse = await fetch(url);
                const searchData = await searchResponse.json();

                // Check if the autoComplete response is an array
                if(searchData.searchResults.results && Array.isArray(searchData.searchResults.results)){
                    console.log(searchData);
                    populateTable(searchData.searchResults.results);
                }
                else{
                    console.error('Error: Incomplete Array', searchData);
                }
            }catch(error){
                console.error('Error: Invalid Return Data', error);
            }
        }
    });

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

    function selectRow(sciName){
        const rows = document.querySelectorAll('#dataTable tbody  tr');
        
        // Deselects all rows
        rows.forEach(row => row.classList.remove('selected'));

        // Find the user selected row to "select"
        const selectedRow = Array.from(rows).find(row => row.cells[1].textContent === sciName);
        if(selectedRow){
            selectedRow.classList.add('selected');
        }

        // Get the long and lat values via the scientific name
        getLatLongs(sciName);
    }

    async function getLatLongs(sciName){
        const url = `https://records-ws.nbnatlas.org/occurrences/search?q=*:*&fq=taxon_name:${sciName}`;

        try{
            const res = await fetch(url);
            const data = await res.json();
            console.log('data: ', data.occurrences);

            data.occurrences.forEach(sighting => {
                console.log("sciName: %s | latLong: %f", sciName, sighting.latLong);
            });

        }catch(error){
            console.error('Error: Could not get LatLong Data', error);
        }
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
        getData(map.getCenter().lat(), map.getCenter().lng());
    });
}
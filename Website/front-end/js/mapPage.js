/**
 * File Name: mapPage.js
 * Author: Vineeth Kirandumkara
 * Date: 06/01/25
 * Description: Javascript file for the MapPage
 */

var map;
var mapWindow;
let markers = [];
let greenSpaceLayer = [];
const BIRD_CLASS = 'Aves';
const LONDON_LAT = 51.5074;
const LONDON_LONG = -0.1278;
const RADIUS_KM = 25;

document.addEventListener('DOMContentLoaded', async () => {

    // const countBox = document.getElementById('sightingBox');
    // if (countBox) {
    //     console.log('sightingBox exists at DOMContentLoaded.');
    // } else {
    //     console.log('sightingBox does not exist at DOMContentLoaded.');
    // }

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

            const url = `https://species-ws.nbnatlas.org/search??q=&fq=commonName:${query}&fq=rk_class:Aves`

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
        const url = `https://records-ws.nbnatlas.org/occurrences/search?q=class:${BIRD_CLASS}&lat=${LONDON_LAT}&lon=${LONDON_LONG}&radius=${RADIUS_KM}&fq=taxon_name:${sciName}`;

        try{
            const res = await fetch(url);
            const data = await res.json();
            console.log('data: ', data.occurrences);

            // Clear all the Markers
            deleteMarkers();

            if(data.occurrences.length == 0){
                console.log("No occurances in London");
            }
            else{
                console.log('%d sightings in London', data.occurrences.length);
                // Add the new Markers
                data.occurrences.forEach(sighting => {
                    //console.log("sciName: %s | latLong: %f", sciName, sighting.latLong);
                    addMarker({lat: sighting.decimalLatitude, lng: sighting.decimalLongitude});
                });
            }

            // Display to the users how many of the bird has been seem
            updateCountBox(`<h3>Bird Sightings</h3><p>There have been ${data.occurrences.length} sightings around London.</p>`);

        }catch(error){
            console.error('Error: Could not get LatLong Data', error);
        }
    }

    // Function to update the count box
    function updateCountBox(content) {
        const countBox = document.getElementById('sightingBox');
        if (countBox) {
            console.log('sightingBox found:', countBox);
            countBox.innerHTML = content;
        } else {
            console.error('Error: sightingBox element not found.');
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

/**
 * Initializes the GMap to the screen
 */
function initMap(){
    try{
        // Create the GMaps Window
        mapWindow = new google.maps.InfoWindow({maxWidth: 300});

        // Sets the Map Defaults
        var mapOptions = {
            center: new google.maps.LatLng(51.514756, -0.104345),
            zoom: 10,
            styles: themedMap
        };

        // Open the GMap
        map = new google.maps.Map(document.getElementById("mapCanvas"), mapOptions);

        // Create Listener to load green spaces
        google.maps.event.addListenerOnce(map, 'idle', () => {
            loadGreenSpaces();
        });

        // Allow for the user to click and drag the map around
        google.maps.event.addListener(map, 'dragend', function() {
            var bounds = map.getBounds();
            console.log("SW: " + bounds.getSouthWest() + " NE: " + bounds.getNorthEast());
            console.log("Center: " + map.getCenter().lat() + ", " +  map.getCenter().lng());
        });
    }
    catch(error){
        handleMapError(error);
    }
}

/**
 * Converts from Easting and Northing to Longitude and Latitude
 * @param {*} easting 
 * @param {*} northing 
 * @returns latitude and longitude values
 */
function convertOSGridToLatLong(easting, northing) {
    try {
        const E = parseFloat(easting);
        const N = parseFloat(northing);
        
        if (isNaN(E) || isNaN(N)) {
            console.error('Invalid coordinate input:', easting, northing);
            return null;
        }

        // Improved conversion formula
        // Optimized for London area
        // Calibrated based on actual data points
        
        // New conversion parameters
        const E0 = 530000; // Easting reference point
        const N0 = 170000; // Northing reference point
        const latScale = 111000; // Latitude scale factor
        const lngScale = 74000;  // Longitude scale factor
        
        // Improved conversion formula
        const lat = 51.4 + ((N - N0) / latScale);
        const lng = -0.15 + ((E - E0) / lngScale);

        
        console.log(`Converting coordinates: E${E}, N${N} -> lat${lat}, lng${lng}`);

        // Validate coordinates are within Greater London area
        if (lat < 51.2 || lat > 51.8 || lng < -0.5 || lng > 0.3) {
            console.warn('Coordinates outside Greater London area:', lat, lng);
            return null;
        }

        return {
            lat: lat,
            lng: lng
        };
    } catch (error) {
        console.error('Coordinate conversion error:', error);
        return null;
    }
}

// Load green spaces data
async function loadGreenSpaces() {
    try {
        console.log('Starting to load green spaces data...');
        const response = await fetch('http://localhost:3000/api/GiGL_SpacesToVisit');
        const greenSpaces = await response.json();
        
        let successCount = 0;
        let errorCount = 0;
        let bounds = new google.maps.LatLngBounds();

        const MIN_AREA = 2.0;

        // Collect all valid green space data
        const validSpaces = greenSpaces.reduce((acc, space) => {
            if (space.Easting && space.Northing && space.AreaHa) {
                const area = parseFloat(space.AreaHa);
                if (area < MIN_AREA) return acc;

                const latLng = convertOSGridToLatLong(space.Easting, space.Northing);
                if (latLng) {
                    const points = generatePolygonPoints(latLng, area);
                    acc.push({ space, points });
                    bounds.extend(new google.maps.LatLng(latLng.lat, latLng.lng));
                    successCount++;
                } else {
                    errorCount++;
                }
            }
            return acc;
        }, []);

        // Sort by area size
        validSpaces.sort((a, b) => parseFloat(b.space.AreaHa) - parseFloat(a.space.AreaHa));

        // Group the data into groups of 50
        const batchSize = 50;
        for (let i = 0; i < validSpaces.length; i += batchSize) {
            const batch = validSpaces.slice(i, i + batchSize);
            
            // Create all polygons in this group at the same time
            const polygons = batch.map(({ space, points }) => {
                const polygon = new google.maps.Polygon({
                    paths: points,
                    strokeColor: '#2E8B57',
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: '#90EE90',
                    fillOpacity: 0,
                    map: map,
                    clickable: true,
                    zIndex: 1,
                    visible: true
                });

            
                polygon.addListener('click', () => {
                    const content = `
                        <div>
                            <h3>${space.SiteName || 'Unnamed Location'}</h3>
                            <p>Type: ${space.PrimaryUse || 'Unknown'}</p>
                            <p>Area: ${parseFloat(space.AreaHa).toFixed(2)} hectares</p>
                            <p>Access: ${space.Access || 'Unknown'}</p>
                        </div>
                    `;
                    
                    const center = calculatePolygonCenter(points);
                    mapWindow.setContent(content);
                    mapWindow.setPosition(center);
                    mapWindow.open(map);
                });

                // Added Hover Effect
                polygon.addListener('mouseover', () => {
                    polygon.setOptions({
                        fillOpacity: 0.6,
                        strokeWeight: 3
                    });
                });

                polygon.addListener('mouseout', () => {
                    polygon.setOptions({
                        fillOpacity: 0.35,
                        strokeWeight: 2
                    });
                });

                greenSpaceLayer.push(polygon);
                return polygon;
            });

            //Add animations to this group as well
            polygons.forEach(polygon => {
                //addBounceAnimation(polygon);
            });

            
            await new Promise(resolve => setTimeout(resolve, 400));
        }

        if (successCount > 0) {
            map.fitBounds(bounds);
        }

        console.log(`Green spaces data loading complete, created ${successCount} areas`);
    } catch (error) {
        console.error('Error loading green spaces data:', error);
    }
}

// Generate more natural polygon vertices
function generatePolygonPoints(center, areaHa) {
    const points = [];
    // Adjust number of points based on area, larger areas have more points
    const numPoints = Math.max(8, Math.min(15, Math.floor(Math.sqrt(areaHa) * 2)));
    const radius = Math.sqrt(areaHa * 10000 / Math.PI);
    
    // Add more randomness to make shapes more natural
    for (let i = 0; i < numPoints; i++) {
        const angle = (i * 2 * Math.PI / numPoints);
        // Increase random range to make shapes more irregular
        const randomRadius = radius * (0.7 + Math.random() * 0.6); // Random between 70%-130%
        const lat = center.lat + (Math.sin(angle) * randomRadius) / 111000;
        const lng = center.lng + (Math.cos(angle) * randomRadius) / (111000 * Math.cos(center.lat * Math.PI / 180));
        points.push({ lat: lat, lng: lng });
    }
    
    // Close polygon
    points.push(points[0]);
    
    return points;
}

// Calculate polygon center point
function calculatePolygonCenter(points) {
    let lat = 0;
    let lng = 0;
    const len = points.length - 1; // Subtract 1 because last point equals first point

    for (let i = 0; i < len; i++) {
        lat += points[i].lat;
        lng += points[i].lng;
    }

    return {
        lat: lat / len,
        lng: lng / len
    };
}

function createPolygon(coords) {
    const polygon = new google.maps.Polygon({
        paths: coords,
        strokeColor: '#228B22',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#228B22',
        fillOpacity: 0,
        map: map
    });
    
    //addBounceAnimation(polygon);
    
    return polygon;
}

/**
 * Error Handler for GMaps
 * @param {*} error 
 */
function handleMapError(error){
    console.error('Map loading error: ', error);
    const mapCanvas = document.getElementById('mapCanvas');
    if(mapCanvas){
        mapCanvas.innerHTML=`
        <div style="text-align: center;
                    padding: 20px;">
            <h3> Map Loading Failed </h3>
            <p>${error.message}</p>
        </div>
        `;
    }
}

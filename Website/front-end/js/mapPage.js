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
    const response = await fetch('http://localhost:3000/api/key');
    const data = await response.json();
    const apiKey = data.apiKey;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);

    // Attach the event listener to the search and submit button
    const form = document.getElementById('searchForm');
    const input = document.getElementById('searchInput');

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevents default form submission. (COME BACK TO)

        const query = input.value;
        if(query){
            const url = `https://species-ws.nbnatlas.org/search/auto?q=${query}&limit=5&geoOnly=true`;

            // GET Request
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log('Get Response: ', data);
                    // Some Response Handling
                })
                .catch(error => {
                    console.error('Error: ', error);
                });
        }
    });
});

function initMap(){
    mapWindow = new google.maps.InfoWindow({maxWidth: 300});

    var mapOptions = {
        center: new google.maps.LatLng(51.514756, -0.104345),
        zoom: 14,
        styles: themedMap
    };

    map = new google.maps.Map(document.getElementById("mapCanvas"), mapOptions);

    google.maps.event.addListener(map, 'dragend', function() {
        var bounds = map.getBounds();
        console.log("SW: " + bounds.getSouthWest() + " NE: " + bounds.getNorthEast());
        console.log("Center: " + map.getCenter().lat() + ", " +  map.getCenter().lng());
        getData(map.getCenter().lat(), map.getCenter().lng());
    });
}
/**
 * File Name: mapPage.js
 * Author: Vineeth Kirandumkara
 * Date: 06/01/25
 * Description: Javascript file for the MapPage
 */

const DEBUG = true; // Set to true to enable debug output

var map;
var mapWindow;
let markers = [];
let greenSpaceLayer = [];
const BIRD_CLASS = 'Aves';
const LONDON_LAT = 51.5074;
const LONDON_LONG = -0.1278;
const RADIUS_KM = 50;

// Add error handling function
function handleMapError(error) {
    console.error('Map loading error:', error);
    const mapCanvas = document.getElementById('mapCanvas');
    if (mapCanvas) {
        mapCanvas.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <h3>Map Loading Failed</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

// Initialize function
function initMap() {
    try {
        console.log('Initializing map...');
        
        // Create info window
        mapWindow = new google.maps.InfoWindow({
            maxWidth: 300
        });

        // Set map default values
        const mapOptions = {
            center: new google.maps.LatLng(51.5074, -0.1278), // London city center
            zoom: 10,
            styles: themedMap || [],
            optimized: true,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false
        };

        // Initialize map
        map = new google.maps.Map(document.getElementById("mapCanvas"), mapOptions);

        // Ensure map is fully loaded before loading green spaces
        google.maps.event.addListenerOnce(map, 'idle', () => {
            loadGreenSpaces();
        });
    } catch (error) {
        handleMapError(error);
    }
}

// Coordinate conversion function
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

        if (DEBUG) {
            console.log(`Converting coordinates: E${E}, N${N} -> lat${lat}, lng${lng}`);
        }

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

// Toggle green spaces display
function toggleGreenSpaces(show) {
    try {
        greenSpaceLayer.forEach(polygon => {
            if (polygon && polygon.setMap) {
                polygon.setMap(show ? map : null);
                if (show) {
                    polygon.setOptions({
                        fillOpacity: 0.35,  // 确保显示时的不透明度
                        visible: true
                    });
                }
            }
        });
    } catch (error) {
        console.error('Error toggling green spaces:', error);
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

                // 添加悬停效果
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
                addBounceAnimation(polygon);
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

// Initialize after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    const sightingBox = document.getElementById('sightingBox');
    if (sightingBox) {
        sightingBox.innerHTML = '<h3>Loading...</h3>';
    }
});

// Error handling function
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Error:', {
        message: msg,
        url: url,
        lineNo: lineNo,
        columnNo: columnNo,
        error: error
    });
    return false;
};

// Ensure window.initMap exists
window.initMap = initMap;

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
    
    
    addBounceAnimation(polygon);
    
    return polygon;
}

// Mapping data between bird names and detail pages
const birdData = {
    "Mallard Duck": "./details.html?birdId=bird1",
    "Anas platyrhynchos": "./details.html?birdId=bird1",
    "Mute Swan": "./details.html?birdId=bird2",
    "Cygnus olor": "./details.html?birdId=bird2",
    "Grey Heron": "./details.html?birdId=bird3",
    "Ardea cinerea": "./details.html?birdId=bird3",
    "Peregrine Falcon": "./details.html?birdId=bird4",
    "Falco peregrinus": "./details.html?birdId=bird4",
    "Red Kite": "./details.html?birdId=bird5",
    "Milvus milvus": "./details.html?birdId=bird5",
    "Pheasant": "./details.html?birdId=bird6",
    "Phasianus colchicus": "./details.html?birdId=bird6",
    "Sparrow": "./details.html?birdId=bird7",
    "Passer domesticus": "./details.html?birdId=bird7",
    "Woodcock": "./details.html?birdId=bird8",
    "Scolopax rusticola": "./details.html?birdId=bird8",
};

// Search Function
function searchBird() {
    // Get the search value entered by the user
    const query = document.getElementById("searchInput").value.trim();

    // Find matching values ​​in birdData
    const targetUrl = birdData[query];
    if (targetUrl) {
        // If a match is found, jump to the corresponding details page
        window.location.href = targetUrl;
    } else {
        alert("No matching bird found. Please check your input.");
    }
    return false; // Preventing the default form submission behavior
}

  
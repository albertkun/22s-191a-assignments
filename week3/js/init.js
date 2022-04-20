let mapOptions={
    "mapCenter":[34.0709,-118.444],
    "zoomLevel":10
}

// declare the map
const map = L.map('the_map').setView(mapOptions.mapCenter, mapOptions.zoomLevel);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//addMarker(37,-122,'home','home land!')
//addMarker(32,-118,'work','where i work land!')
//addMarker(39,-119,'location 1','random location')
//addMarker(36,-120,'location 2','another random location')

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    createButtons(lat,lng,title);
    return message
}

function addCircleMarker(lat,lng,title,message){
    console.log(message)
    L.circleMarker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    createButtons(lat,lng,title);
    return message
}


fetch("mappy.geojson")
    .then(response => {
        return response.json()
    })
    .then(data =>{
        // Basic Leaflet method to add GeoJSON data
        L.geoJSON(data, {
                pointToLayer: (feature, latlng) => { 
                    return L.circleMarker(latlng, {color: feature.properties.color})
                }
            }).bindPopup(layer => {
                return layer.feature.properties.location;
            }).addTo(map);
    })



function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    document.getElementById("contents").appendChild(newButton); //this adds the button to our page.
}

addCircleMarker(39.290386,-76.612190,'baltimore aquarium','i love this aquarium! They have $1 entry sometimes')
addCircleMarker(38.911999,-77.227547,'tysons corner','I used to go here every weekend lol')
addCircleMarker(40.292210,-76.671700,'hershey park','only about 3 hours away from me, pricessless experience that i experience every year')
addCircleMarker(38.892060,-77.019910,'smithsonian','i have been to this museum dozens of times')
addCircleMarker(38.147310,-75.182240,'assateague island national park','a lot of mosquitoes but a beautiful beach and wild horses!')
addCircleMarker(34.0679701,-118.4505796,'my current apartment','i hate this place so much')
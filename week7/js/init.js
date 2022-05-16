// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5};

let female = L.featureGroup();
let male = L.featureGroup();

let layers = {
    "gurrrl": female,
    "a MAN": male
};

let circleOptions = {
    radius: 4,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQw0km6YsefO33Vg1xcZ8cCGwAlfAg_KE1nZ_-WjOv01dBAi-2PzMRnAbpnRY6Op2fY-P2tPhbL1BBJ/pub?output=csv";

const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

let Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16
});

Esri_WorldGrayCanvas.addTo(map);

// add layer control box
L.control.layers(null,layers).addTo(map);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

function addMarker(data){
    if(data['what is your identified gender?'] == "Female"){
        circleOptions.fillColor = "pink"
        female.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>${data['Where is your hometown?? (City, State format please!)']}</h2> <h3>${data['how much do you spend a month on clothes/jewelry?']}</h3>`))
        createButtons(data.lat,data.lng,data['Where is your hometown?? (City, State format please!)'])
        }
    else{
        circleOptions.fillColor = "black"
        male.addLayer(L.circleMarker([data.lat,data.lng],circleOptions).bindPopup(`<h2>${data['Where is your hometown?? (City, State format please!)']}</hs><h3>not a materialgrl</h3>`))
        createButtons(data.lat,data.lng,data['Where is your hometown?? (City, State format please!)'])
    }
    return data
};

function createButtons(lat,lng,title){
    const newButton = document.createElement("button"); // adds a new button
    newButton.id = "button"+title; // gives the button a unique id
    newButton.innerHTML = title; // gives the button a title
    newButton.setAttribute("lat",lat); // sets the latitude 
    newButton.setAttribute("lng",lng); // sets the longitude 
    newButton.addEventListener('click', function(){
        map.flyTo([lat,lng]); //this is the flyTo from Leaflet
    })
    const spaceForButtons = document.getElementById('placeForButtons')
    spaceForButtons.appendChild(newButton);//this adds the button to our page.
};

function loadData(url){
    Papa.parse(url, {
        header: true,
        download: true,
        complete: results => processData(results)
    })
};

function processData(results){
    console.log(results)
    results.data.forEach(data => {
        console.log(data)
        addMarker(data)
    })
    female.addTo(map) // add our layers after markers have been made
    male.addTo(map) // add our layers after markers have been made  
    let allLayers = L.featureGroup([female,male]);
    map.fitBounds(allLayers.getBounds());
};

loadData(dataUrl)

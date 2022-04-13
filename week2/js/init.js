console.log('hellooo >:)');

// JavaScript const variable declaration
const map = L.map('the_map').setView([34.0709, -118.444], 15); 

// Leaflet tile layer, i.e. the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', 
    gestureHandling: "cooperative",
    center: [38.977297, -77.1826747]
}).addTo(map); 

//JavaScript let variable declaration to create a marker
//let marker = L.marker([34.0709, -118.444]).addTo(map) 
     //   .bindPopup('Math Sciences 4328 aka the Technology Sandbox<br> albert lab ')
       // .openPopup();



//home
let marker3 = L.marker([38.977297,-77.1826747]).addTo(map) 
.bindPopup('my home that i have lived in since i was 4 years old')
.openPopup();






function our_first_function(){
    console.log('hello from our first function')
}

our_first_function

function add_marker(lat,lng,popup){
    L.marker([lat,lng],{color:'pink'}).addTo(map)
    .bindPopup(popup)
}



function add_circle(lat,lng,popup){
    L.circleMarker([lat,lng],{color:'yellow'}).addTo(map)
    .bindPopup(popup)
}

add_circle(39.290386,-76.612190,'baltimore aquarium - my favorite aquarium; kind of a long drive away')
add_circle(38.911999,-77.227547,'tysons corner - favorite shopping center, i go here every weekend')
add_circle(40.292210,-76.671700,'hershey park - fantastic amusement park, i love the chocolate')
add_circle(38.892060,-77.019910,'smithsonian - i have been to this museum dozens of times')
add_circle(38.147310,-75.182240,'assateague island national park - a lot of mosquitoes but a beautiful beach and wild horses!')


// declare variables
let mapOptions = {'center': [34.0709,-118.444],'zoom':5}

// use the variables
const map = L.map('the_map').setView(mapOptions.center, mapOptions.zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// create a function to add markers
function addMarker(lat,lng,title,message){
    console.log(message)
    L.marker([lat,lng]).addTo(map).bindPopup(`<h2>${title}</h2> <h3>${message}</h3>`)
    return message
}


const dataUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSgzJYv5patSDAIUAzaoz-tC7pCmrNRCJEopbJlOAVuLnkw0GFzTycLxJCwPh-pQqL4UItpy27X4prg/pub?output=csv"

function loadData(url){
    Papa.parse(dataUrl, {
        header: true,
        download: true,
        complete: results => {results.data.forEach(marker=>addMarker(marker.lat,marker.lng,marker['Where is your hometown located?'],
        marker['What socioeconomic status do you consider your family to be?']))}
    })
}
function processData(results){
    //console.log(results) //for debugging: this can help us see if the results are what we want
    results.data.forEach(data => {
        console.log(data) // for debugging: are we seeing each data correctly?
        // the console log can make sure we have the right field names selected! 
        addMarker(data.lat,data.lng,data['Where is your hometown located?'],data['What socioeconomic status do you consider your family to be?'])
    })
}


// this is our function call to get the data
loadData(dataUrl)

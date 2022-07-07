// Add console.log to check to see if our code is working.
console.log("working");
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
 attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
 maxZoom: 18,
 accessToken: API_KEY
});
// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
 attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
 maxZoom: 18,
 accessToken: API_KEY
});
// Create a base layer that holds both maps.
let baseMaps = {
 "Streets": streets,
 "Satellite Streets": satelliteStreets
};
// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
 center: [39.5, -98.5],
 zoom: 3,
 layers: [streets]
});
// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map)
// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
 // This function returns the style data for each of the earthquakes we plot on
 // the map. We pass the magnitude of the earthquake into two separate functions
 // to calculate the color and radius.
 function styleInfo(feature) {
   return {
     opacity: 1,
     fillOpacity: 1,
     fillColor: "#FFAE42",
     color: "#000000",
     radius: getRadius(feature.properties.mag),
     stroke: true,
     weight: 0.5
   };
 }
 // This function determines the radius of the earthquake marker based on its magnitude.
 // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
 function getRadius(magnitude) {
   if (magnitude === 0) {
     return 1;
   }
   return magnitude * 4;
 }
// Creating a GeoJSON layer with the retrieved data.
 L.geoJson(data, {
     // We turn each feature into a circleMarker on the map.
     pointToLayer: function(feature, latlng) {
         console.log(data);
         return L.circleMarker(latlng);
       },
     // We set the style for each circleMarker using our styleInfo function.
   style: styleInfo
   }).addTo(map);
});



// // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
//         "tz":"America/Los_Angeles"},
//         "geometry":{
//             "type":"Point",
//             "coordinates":[-122.375,37.61899948120117]}}
// ]};


// // Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport, {
//     onEachFeature: function(feature, layer) {
//       console.log(layer);
//       layer.bindPopup();
//     }
//   }).addTo(map);

// // An array containing each city's location, state, and population.
// let cities = [{
//   location: [40.7128, -74.0059],
//   city: "New York City",
//   state: "NY",
//   population: 8398748
// },
// {
//   location: [41.8781, -87.6298],
//   city: "Chicago",
//   state: "IL",
//   population: 2705994
// },
// {
//   location: [29.7604, -95.3698],
//   city: "Houston",
//   state: "TX",
//   population: 2325502
// },
// {
//   location: [34.0522, -118.2437],
//   city: "Los Angeles",
//   state: "CA",
//   population: 3990456
// },
// {
//   location: [33.4484, -112.0740],
//   city: "Phoenix",
//   state: "AZ",
//   population: 1660272
// }
// ];

// // Get data from cities.js
// let cityData = cities;

// Loop through the cities array and create one marker for each city.
//cityData.forEach(function(city) {
  //  console.log(city)
  //  L.circleMarker(city.location, {
   //   radius: city.population/200000
   // })
   // .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
   // .addTo(map);
//)};
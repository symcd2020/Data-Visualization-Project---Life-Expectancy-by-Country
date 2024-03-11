// Creating the map object
let myMap = L.map("map", {
  center: [0, 0],
  zoom: 1
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Load the GeoJSON data.
let geoData = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/15-Mapping-Web/ACS-ED_2014-2018_Economic_Characteristics_FL.geojson";

// Get the data with d3.
d3.json(geoData).then(function(data) {

  // Create a new choropleth layer.
  let geojson = L.choropleth(data, {

    // Define which property in the features to use.
    valueProperty: "DP03_16E",

    // Set the color scale.
    scale: ["#ffffb2", "#b10026"],

    // The number of breaks in the step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },

    // Binding a popup to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<strong>" + feature.properties.NAME + "</strong><br /><br />Average life expectancy: " +
        feature.properties.DP03_16E);
    }
  }).addTo(myMap);

  // Set up the legend.
  let legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let limits = geojson.options.limits;
    let colors = geojson.options.colors;
    let labels = [];

    // Add the minimum and maximum.
    let legendInfo = "<h6>Average Life Expectancy</h6>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding the legend to the map
  legend.addTo(myMap);

  let selectDecadeDropdown = document.getElementById("selDataset1");

  for (let year = 1950; year <= 2024; year ++) {
      let option = document.createElement("option");
      option.text = year;
      option.value = year;
      selectDecadeDropdown.add(option);
}

  let selectGenderDropdown = document.getElementById("selDataset2");
  
  let genders = ["Male", "Female", "Total"];
  genders.forEach(gender => {
    let option = document.createElement("option");
    option.text = gender;
    option.value = gender.toLowerCase();
    selectGenderDropdown.add(option);
});

});

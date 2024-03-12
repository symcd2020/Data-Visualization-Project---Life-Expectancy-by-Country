// -------------------------------------
// WORLD MAP START
// -------------------------------------
var params = {year: lifeData[0].year, gender: ''};

var map = L.map('map').setView([0, 0], 2);

var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

function optionChanged(key, value) {
  console.log(`optionChanged: ${key}: ${value}`);
  params[key] = value;

  plotData(value);

  //call hplot
  hbarChart(value);
}


function isLifeDataRowMatch(item, country, year, gender) {
  return ((item.country == country.properties.sovereignt)
  && (item.year = params.year));
}

function mapYearSelection(year){
  //Filter clean life expectancy on year
  selectedYear = lifeData.filter(row => row.year == year);
  let geojson = cleanCountriesData;
  console.log(selectedYear.length);
  //inject data into geojson properties ----------------TODO: Loop stopping after 1 iteration
  for (i= 0; i < selectedYear.length; i++){
    let country = selectedYear[i].country;
    for (j=0; j < geojson.features.length; j++){

     if (geojson.features[j].properties.name.toLowerCase() == country.toLowerCase()){ //compare both sides in lower
        
        // inject data in to geojson
        geojson.features[j].properties.combinedavglifeexpectancy = selectedYear[i].combinedavglifeexpectancy;
        geojson.features[j].properties.maleavglifeexpectancy = selectedYear[i].maleavglifeexpectancy;
        geojson.features[j].properties.femaleavglifeexpectancy = selectedYear[i].femaleavglifeexpectancy;
        geojson.features[j].properties.year = selectedYear[i].year;
        
        break; //stop looking, we found it
     }
    }

  }
  
   return geojson;
  //return goejhon dataset with life data for givven year
}

function plotData(year) {

  // console.log(cleanCountriesData)
      let yearSelectionData = mapYearSelection(year);
      console.log(yearSelectionData);
      L.choropleth(yearSelectionData, {
        valueProperty: 'combinedavglifeexpectancy', // which property in the features to use
        scale: ['white', 'blue'], // chroma.js scale - include as many as you like
        steps: 10, // number of breaks or steps in range
        mode: 'q', // q for quantile, e for equidistant, k for k-means
        style: {
          color: '#fff', // border color
          weight: 2,
          fillOpacity: 0.8
        },
        onEachFeature: function(feature, layer) {

              // Check if countryData is available
              
                // feature.properties.year
                  layer.bindPopup("<strong><h3>" + feature.properties.name + " - "  + "</h3></strong><br />Average Life Expectancy: " +
                      feature.properties.combinedavglifeexpectancy + "<br /><br />Male Life Expectancy: " +
                      feature.properties.maleavglifeexpectancy + "<br /><br />Female Life Expectancy: " +
                      feature.properties.femaleavglifeexpectancy
                      );
              
          }
      }).addTo(map);
    };

// -------------------------------------
// WORLD MAP END
// -------------------------------------




// -------------------------------------
// DROPDOWN START
// -------------------------------------

  let selectYearDropdown = document.getElementById("selDataset1");

  lifeData.forEach(obj=>{
    // console.log(`Object ${index + 1}:`);
    const year = obj.year;
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    selectYearDropdown.append(option)});

plotData(1950);

// });

// -------------------------------------
// DROPDOWN END
// -------------------------------------



// -------------------------------------
// BAR CHART START
// -------------------------------------

// Set up URL for data
// Create horizontal bar chart for top 10 OTUs

function filterYear(row, year){
  return row.year == year;
}

function hbarChart(year) {
  let lifeExpectancy = "CleanedLifeExpectancyData1950to2024.json"
//  CHANGE
  d3.json(lifeExpectancy).then(function(data) {
    console.log(data.length)
    // TODO: sort data, slice data, Filter by year 
    data = data.filter(row => row.year == year);
    data = data.slice(0, 10);
    let y_axis = data.map(row => row.country)
    let x_axis = data.map(row => row.combinedavglifeexpectancy)
    let text = data.map(row => row.country)
    console.log(data.length)

    barChart = {
        x: x_axis,
        y: y_axis,
        text: text,
        type: "bar",
        orientation: "h",
    };

    let chart = [barChart];

    let layout = {
        margin: {
            l: 100,
            r: 100,
            t: 0,
            b: 100,
        },
        height: 500,
        width: 600,
  };

  Plotly.newPlot("bar", chart, layout);
})};

//init state of hbar
hbarChart(1950); //todo: get value of ddl

// -------------------------------------
// BAR CHART END
// -------------------------------------
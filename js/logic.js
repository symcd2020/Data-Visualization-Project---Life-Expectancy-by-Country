
var params = {year: lifeData[0].year};

// -------------------------------------
// DROPDOWN START
// -------------------------------------

let selectYearDropdown = document.getElementById("selDataset1");

let yearOptions = [];

lifeData.forEach(obj=>{
  const year = obj.year;
  if (!(yearOptions.includes(year))){
    yearOptions.push(year);
  }
});

  yearOptions.forEach(obj=>{
  const option = document.createElement("option");
  option.value = obj;
  option.textContent = obj;
  selectYearDropdown.append(option);
});

function optionChanged(key, value) {
  console.log(`optionChanged: ${key}: ${value}`);
  params[key] = value;

  // calls on the legend class and removes it if already exists
  console.log(document.querySelector(".legend").innerHTML);
  document.querySelector(".legend").remove();

  // call on world map function plotData
  plotData(value);

  // call on function lowBarChar
  lowBarChart(value);

  // call on function highBarChart
  highBarChart(value);

  // call on function plotPieChart
  plotPieChart(value)
}

// -------------------------------------
// DROPDOWN END
// -------------------------------------



// -------------------------------------
// WORLD MAP START
// -------------------------------------

// Creating the map object, makes it so the map does not zoom in or out on mouse wheel, and sets view to center of map
 var map = L.map('map', {scrollWheelZoom :false}).setView([0, 0], 2);

 // Adds the tile layer
      var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

// Checks to see if the country matches in both datasets and if the year from the dropdown matches the year in the country dataset 
function isLifeDataRowMatch(item, country, year, gender) {
  return ((item.country == country.properties.sovereignt)
  && (item.year = params.year));
}


//takes an inputted year and returns a country's life expectancy data for that year
function mapYearSelection(year){

  //filters clean life expectancy by year
  selectedYear = lifeData.filter(row => row.year == year);
  let geojson = cleanCountriesData;
  console.log(selectedYear.length);

  //inject data into geojson properties
  for (i= 0; i < selectedYear.length; i++){
    let country = selectedYear[i].country;
    for (j=0; j < geojson.features.length; j++){

     //compares both sides in lower
     if (geojson.features[j].properties.name.toLowerCase() == country.toLowerCase()){ 
        
        // injects data in to geojson
        geojson.features[j].properties.combinedavglifeexpectancy = selectedYear[i].combinedavglifeexpectancy;
        geojson.features[j].properties.maleavglifeexpectancy = selectedYear[i].maleavglifeexpectancy;
        geojson.features[j].properties.femaleavglifeexpectancy = selectedYear[i].femaleavglifeexpectancy;
        geojson.features[j].properties.year = selectedYear[i].year;
        
        break;
     }
    }

  }
  //returns the geojson dataset with life data for the selected year
   return geojson;
  
}

//plots out a map with a country's specific life expectancy data based on a given year
function plotData(year) {
     
  // console.log(cleanCountriesData)
      let yearSelectionData = mapYearSelection(year);
      console.log(yearSelectionData);

      // Create a new choropleth layer.
      let geojson = L.choropleth(yearSelectionData, {

        //life expectancy data value to use for the color scale
        valueProperty: 'combinedavglifeexpectancy',
        scale: ['#FF1053', '#30C5FF'],
        steps: 10,
        mode: 'q',
        style: {
          color: '#fff',
          weight: 1,
          fillOpacity: 0.8
        },

        //adds a popup for every click on a specific country and adds it to the map
        onEachFeature: function(feature, layer) {
                  layer.bindPopup("<strong><h3>" + feature.properties.name + "</h3></strong><br />Average Life Expectancy: " +
                      feature.properties.combinedavglifeexpectancy + "<br /><br />Male Life Expectancy: " +
                      feature.properties.maleavglifeexpectancy + "<br /><br />Female Life Expectancy: " +
                      feature.properties.femaleavglifeexpectancy
                      );
              
          }
      }).addTo(map);

      // Set up the legend.
      let legend = L.control({ position: "bottomright" });
      legend.onAdd = function() {
        let div = L.DomUtil.create("div", "info legend");
        let limits = geojson.options.limits;
        let colors = geojson.options.colors;
        let labels = [];

        // Add the minimum and maximum.
        let legendInfo = "<h1>Average Life Expectancy</h1>" +
          "<div class=\"labels\">" +
            "<div class=\"min\">" + limits[0] + "</div>" +
            "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
          "</div>";
          console.log(legendInfo);

        div.innerHTML = legendInfo;
      

        limits.forEach(function(limit, index) {
          labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
      };

      // Adding the legend to the map
      legend.addTo(map);
      return legend;
    };

// -------------------------------------
// WORLD MAP END
// -------------------------------------


// -------------------------------------
// LOWEST BAR CHART START
// -------------------------------------

// Create horizontal bar chart for top 10 countries with lowest life expectancy
function filterYear(row, year){
  return row.year == year;
}

function lowBarChart(year) {
  let lifeExpectancy = "Data/CleanedLifeExpectancyData1950to2024.json"

  d3.json(lifeExpectancy).then(function(data) {
    console.log(data.length)
    
    data.sort((a,b) => a.combinedavglifeexpectancy - b.combinedavglifeexpectancy);
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
        marker: {
          color: 'FF1053'
      }
    };

    let chart = [barChart];

    let layout = {
        margin: {
            l: 200,
            r: 50,
            t: 0,
            b: 100,
        },
        
        xaxis: {
            title: 'Age'
        },
        yaxis: {
          // title: 'Country'
      },
        height: 500,
        width: 800,
  };

  Plotly.newPlot("low-bar", chart, layout);
})};

lowBarChart(1950);

// -------------------------------------
// HIGHEST BAR CHART START
// -------------------------------------

// Create horizontal bar chart for top 10 countries with highest life expectancy
function highBarChart(year) {
  let lifeExpectancy = "Data/CleanedLifeExpectancyData1950to2024.json"

  d3.json(lifeExpectancy).then(function(data) {
    console.log(data.length)
    
    data.sort((a,b) => b.combinedavglifeexpectancy - a.combinedavglifeexpectancy);
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
        marker: {
          color: '30C5FF'
      }
          
    };

    let chart = [barChart];

    let layout = {
        margin: {
            l: 200,
            r: 50,
            t: 0,
            b: 100,
        },
        
        xaxis: {
            title: 'Age'
        },
        yaxis: {
          // title: 'Country'
      },
        height: 500,
        width: 800,
  };

  Plotly.newPlot("high-bar", chart, layout);
})};


highBarChart(1950);
plotData(1950);

// -------------------------------------
// BAR CHART END
// -------------------------------------



// -------------------------------------
// PIE CHART START
// -------------------------------------

function aggregateLifeExpectancy(year) {
  let aggregatedData = {};

  // Filter data for the given year
  let filteredData = lifeData.filter(row => row.year == year);

let continents = ['North America', 'South America', 'Africa', 'Europe', 'Asia', 'Oceania'];
let aggregateData = [];

continents.forEach(currentcontinent => {
  let continentData = filteredData.filter(country => country.continent == currentcontinent)

  let length = continentData.length

  let value = 0
  continentData.forEach(row => {
    value += parseFloat(row.combinedavglifeexpectancy)
  })
  let avglifeexpectancy = value/length

  let currentcontinentdata = [currentcontinent, avglifeexpectancy]
  aggregateData.push(currentcontinentdata)
});

return aggregateData;
}

// Define plotPieChart function
function plotPieChart(year) {
  let aggregatedData = aggregateLifeExpectancy(year);

  // Convert aggregated data into arrays for Plotly
  let labels = aggregatedData.map(function(x){
    return x[0];
  });
  let values = aggregatedData.map(function(x){
    return x[1];
  });
console.log(labels,values)

//   // Custom colors for the pie chart
 let customColors = ['#FF1053 ', '#9B5DE5','#F28F3B', '#80FF72', '#242325', '#30C5FF '];

//   // Create pie chart data with custom colors
  let pieChart = {
     labels: labels,
      values: values,
      type: 'pie',
      marker: { colors: customColors },
      textinfo: 'value',
      texttemplate: '%{value:.2f} yrs'

   };

  let layout = {
      height: 500,
    width: 600
  };

Plotly.newPlot('piechart', [pieChart] , layout);
 }


//Plot Chart
plotPieChart(1950); 


// -------------------------------------
// PIE CHART END
// -------------------------------------
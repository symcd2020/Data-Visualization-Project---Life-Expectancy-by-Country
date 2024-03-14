
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



// });

// -------------------------------------
// DROPDOWN END
// -------------------------------------



// -------------------------------------
// WORLD MAP START
// -------------------------------------
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
  //inject data into geojson properties ----------------
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
// HIGHEST BAR CHART START
// -------------------------------------

// Set up URL for data
// Create horizontal bar chart for top 10 OTUs

function filterYear(row, year){
  return row.year == year;
}

function lowBarChart(year) {
  let lifeExpectancy = "CleanedLifeExpectancyData1950to2024.json"
//  CHANGE
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
       
          
    };

    let chart = [barChart];

    let layout = {
        margin: {
            l: 300,
            r: 100,
            t: 0,
            b: 100,
        },
        
        xaxis: {
            title: 'Top 10 Countries with Lowest Life Expectancies By Age'
        },
        yaxis: {
          title: 'Country'
      },
        height: 300,
        width: 800,
  };

  Plotly.newPlot("low-bar", chart, layout);
})};

//init state of hbar
lowBarChart(1950); //todo: get value of ddl

// -------------------------------------
// LOWEST BAR CHART START
// -------------------------------------

// Set up URL for data
// Create horizontal bar chart for top 10 OTUs

// function filterYear(row, year){
//   return row.year == year;
// }

function highBarChart(year) {
  let lifeExpectancy = "CleanedLifeExpectancyData1950to2024.json"

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
       
          
    };

    let chart = [barChart];

    let layout = {
        margin: {
            l: 300,
            r: 100,
            t: 0,
            b: 100,
        },
        
        xaxis: {
            title: 'Top 10 Countries with Highest Life Expectancies By Age'
        },
        yaxis: {
          title: 'Country'
      },
        height: 300,
        width: 800,
  };

  Plotly.newPlot("high-bar", chart, layout);
})};

//init state of hbar
highBarChart(1950); //todo: get value of ddl
plotData(1950);

// -------------------------------------
// BAR CHART END
// -------------------------------------

// -------------------------------------
// PIE CHART START
// -------------------------------------

// function aggregateLifeExpectancy(year) {
//   let aggregatedData = {};

//   // Filter data for the given year
//   let filteredData = lifeData.filter(row => row.year == year);
  
//   // Iterate through filtered data to aggregate combined life expectancy for each continent
//   filteredData.forEach(row => {
//       let continent = row.continent;
//       console.log(continent)
//       let combinedLifeExpectancy = row.combinedavglifeexpectancy;
      
//       // If continent already exists in aggregated data, add the life expectancy, else initialize it
//       if (aggregatedData.hasOwnProperty(continent)) {
//           aggregatedData[continent] += combinedLifeExpectancy;
//       } else {
//           aggregatedData[continent] = combinedLifeExpectancy;
//       }
//   });
  
//   return aggregatedData;
// }

// function plotPieChart(year) {
//   let aggregatedData = aggregateLifeExpectancy(year);
  
//   // Convert aggregated data into arrays for Plotly
//   let labels = Object.keys(aggregatedData);
//   let values = Object.values(aggregatedData);
  

//   // Custom colors for the pie chart
//   let customColors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

//   // Create pie chart data with custom colors
//   let pieChart = {
//       labels: labels,
//       values: values,
//       type: 'pie',
//       marker: { colors: customColors } 
//   };


//   let layout = {
//       height: 500,
//       width: 600
//   };
  
//   Plotly.newPlot('piechart', [pieChart], layout);
// }

// // Call plotPieChart function with the desired year
// plotPieChart(1950);


// -------------------------------------
// PIE CHART END
// -------------------------------------
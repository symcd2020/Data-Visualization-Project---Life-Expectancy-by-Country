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
  plotData();
}


function isLifeDataRowMatch(item, country, year, gender) {
  return ((item.country == country.properties.sovereignt)
  && (item.year = params.year));
}


function plotData() {
  console.log(params);
  cleanCountriesData.features.forEach(country => {
      let matchingLifeData = lifeData.find(item => isLifeDataRowMatch(item, country, params.year, params.gender));

      if (matchingLifeData) {
          country.properties.countryData = {
              country: matchingLifeData.country,
              year: matchingLifeData.year,
              combinedavglifeexpectancy: matchingLifeData.combinedavglifeexpectancy,
              maleavglifeexpectancy: matchingLifeData.maleavglifeexpectancy,
              femaleavglifeexpectancy: matchingLifeData.femaleavglifeexpectancy,
              
          };
      }
  });

  // console.log(cleanCountriesData);

  L.choropleth(cleanCountriesData, {
    valueProperty: 'pop_est', // which property in the features to use
    scale: ['white', 'blue'], // chroma.js scale - include as many as you like
    steps: 10, // number of breaks or steps in range
    mode: 'q', // q for quantile, e for equidistant, k for k-means
    style: {
      color: '#fff', // border color
      weight: 2,
      fillOpacity: 0.8
    },
    onEachFeature: function(feature, layer) {
      const countryData = feature.properties.countryData;

          // Check if countryData is available
          if (countryData) {
              layer.bindPopup("<strong><h3>" + feature.properties.sovereignt + " - " + countryData.year + "</h3></strong><br />Average Life Expectancy: " +
                  countryData.combinedavglifeexpectancy + "<br /><br />Male Life Expectancy: " +
                  countryData.maleavglifeexpectancy + "<br /><br />Female Life Expectancy: " +
                  countryData.femaleavglifeexpectancy);
          }
      }
  }).addTo(map);
};

// -------------------------------------
// WORLD MAP END
// -------------------------------------

  let selectYearDropdown = document.getElementById("selDataset1");

  lifeData.forEach(obj=>{
    // console.log(`Object ${index + 1}:`);
    const year = obj.year;
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    selectYearDropdown.append(option)});

plotData();


// });

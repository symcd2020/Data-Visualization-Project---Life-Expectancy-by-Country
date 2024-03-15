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
   let customColors = ['#1f77b4', '#ff7f0e','#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];
  
  //   // Create pie chart data with custom colors
    let pieChart = {
       labels: labels,
        values: values,
        type: 'pie',
        marker: { colors: customColors },
        textinfo: 'value',
        texttemplate: '%{value:.2f}'
  
     };
  
    let layout = {
        height: 500,
      width: 600
    };
  
  Plotly.newPlot('piechart', [pieChart] , layout);
   }
  
  
  //Plot Chart
  plotPieChart(1950); 

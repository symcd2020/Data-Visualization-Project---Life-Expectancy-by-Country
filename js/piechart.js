<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pie Chart Example</title>
    <!-- Include Plotly.js -->
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
</head>
<body>
  <div id="circle-chart"></div> 
    
    <!-- Your JavaScript code -->


    <script>
        function aggregateLifeExpectancy(year) {
            let aggregatedData = {};

            // Filter data for the given year
            let filteredData = lifeData.filter(row => row.year == continent);
            
            // Iterate through filtered data to aggregate combined life expectancy for each continent
            filteredData.forEach(row => {
                let continent = row.continent;
                console.log(continent)
                let combinedLifeExpectancy = row.combinedavglifeexpectancy;
                
                // If continent already exists in aggregated data, add the life expectancy, else initialize it
                if (aggregatedData.hasOwnProperty(continent)) {
                    aggregatedData[continent] += combinedLifeExpectancy;
                } else {
                    aggregatedData[continent] = combinedLifeExpectancy;
                }
            });
            
            return aggregatedData;
            
          } 
        
        // This was missing in your code
      

        function plotPieChart(year) {
            let aggregatedData = aggregateLifeExpectancy(year);
            
            // Convert aggregated data into arrays for Plotly
            let labels = Object.keys(aggregatedData);
            let values = Object.values(aggregatedData);
            
            // Create pie chart data
            let pieChart = {
                labels: labels,
                values: values,
                type: 'pie'
            };
            
            let layout = {
                height: 500,
                width: 600
            };
            
            Plotly.newPlot('circle-chart', [pieChart], layout);
        }

        // Call plotPieChart function with the desired year
        plotPieChart(1950);

  

<script type="text/javascript" src="data\Cleanedcountries.js"></script>
    <script type="text/javascript" src="data\CleanedLifeExpectancyData1950to2024.js"></script>
    <script type="text/javascript" src="js\logic.js"></script>
    <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>

    </script>
</body>
</html>

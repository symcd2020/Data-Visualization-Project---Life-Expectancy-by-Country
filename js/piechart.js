function aggregateLifeExpectancy(year) {
    let aggregatedData = {};

    // Filter data for the given year
    let filteredData = lifeData.filter(row => row.year == year);
    
    // Iterate through filtered data to aggregate combined life expectancy for each continent
    filteredData.forEach(row => {
        let continent = row.continent;
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

function plotPieChart(year) {
    let aggregatedData = aggregateLifeExpectancy(year);
    
    // Convert aggregated data into arrays for Plotly
    let labels = Object.keys(aggregatedData);
    let values = Object.values(aggregatedData);
    
    // Custom colors for the pie chart
    let customColors = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

    // Create pie chart data with custom colors
    let pieChart = {
        labels: labels,
        values: values,
        type: 'pie',
        marker: { colors: customColors } 
    };

    let layout = {
        height: 500,
        width: 600
    };
    
    Plotly.newPlot('piechart', [pieChart], layout);
}

// Call plotPieChart function with the desired year
plotPieChart(1950);


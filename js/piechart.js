// Define filterData function
function filterData() {
  // Filter data based on conditions (you can customize these conditions)
  return lifeData.filter(item => item.year === params.year && item.gender === params.gender);
}

function createPieChart() {
  // Filter the data based on conditions
  let filteredLifeData = filterData();

  // Create pie chart data
  let pieData = filteredLifeData.map(item => ({
    label: item.country,
    value: parseFloat(item.combinedavglifeexpectancy),
  }));

  // Set up pie chart dimensions
  let pieWidth = 300;
  let pieHeight = 300;
  let pieRadius = Math.min(pieWidth, pieHeight) / 2;

  // Set up color scale
  let colorScale = d3.scaleOrdinal()
    .domain(pieData.map(d => d.label))
    .range(['#4e79a7', '#f28e2c', '#e15759', '#76b7b2', '#59a14f']);

  // Create SVG element for the pie chart
  let pieSvg = d3.select('#pie-chart-container')
    .append('svg')
    .attr('width', pieWidth)
    .attr('height', pieHeight)
    .append('g')
    .attr('transform', `translate(${pieWidth / 2},${pieHeight / 2})`);

  // Create pie chart arcs
  let pie = d3.pie().value(d => d.value);
  let arc = d3.arc().outerRadius(pieRadius).innerRadius(0);

  // Add slices to the pie chart
  let pieArcs = pieSvg.selectAll('arc')
    .data(pie(pieData))
    .enter()
    .append('g')
    .attr('class', 'arc');

  pieArcs.append('path')
    .attr('d', arc)
    .attr('fill', d => colorScale(d.data.label))
    .attr('stroke', 'white')
    .style('stroke-width', '2px');

  // Add labels
  pieArcs.append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .text(d => d.data.label)
    .style('fill', 'white');
}
// Call the plotData function
plotData();

// Call the createPieChart function
createPieChart();
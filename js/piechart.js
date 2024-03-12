let pieData = [
  { label: 'Country', value: parseFloat(cleanCountriesData.country) },
  { label: 'Avg Life Expectancy', value: parseFloat(cleanCountriesData.combinedlifexpectancy) }
];

let width = 300;
let height = 300;
let radius = Math.min(width, height) / 2;

let colorScale = d3.scaleOrdinal()
  .domain(pieData.map(d => d.label))
  .range(['#4e79a7', '#f28e2c']);

let svg = d3.select('#pie-chart-container')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', `translate(${width / 2},${height / 2})`);

let pie = d3.pie().value(d => d.value);
let arc = d3.arc().outerRadius(radius).innerRadius(0);

let arcs = svg.selectAll('arc')
  .data(pie(pieData))
  .enter()
  .append('g')
  .attr('class', 'arc');

arcs.append('path')
  .attr('d', arc)
  .attr('fill', d => colorScale(d.data.label))
  .attr('stroke', 'white')
  .style('stroke-width', '2px');

arcs.append('text')
  .attr('transform', d => `translate(${arc.centroid(d)})`)
  .attr('text-anchor', 'middle')
  .text(d => d.data.label)
  .style('fill', 'white');



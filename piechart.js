d3.json("Cleanedcountries.json")
      .then(jsonData => {
        createStyledPieChart(jsonData);
      })
      .catch(error => {
        console.error("Error loading JSON data:", error);
      });

    // Function to create the styled pie chart
    function createStyledPieChart(data) {
      // Extract data for the pie chart (using the first entry)
      let selectedData = data[0];

      // Prepare data for the pie chart
      let pieData = [
        { "label": "Life Expectancy", "value": selectedData.life_expectancy },
        { "label": "Remaining", "value": 100 - selectedData.life_expectancy }
      ];

      // Set up pie chart dimensions
      let width = 300;
      let height = 300;
      let radius = Math.min(width, height) / 2;

      // Set up color scale
      let colorScale = d3.scaleOrdinal()
        .domain(pieData.map(d => d.label))
        .range(["#4e79a7", "#f28e2c"]);

      // Create SVG element
      let svg = d3.select("#pie-chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      // Create pie chart arcs
      let pie = d3.pie().value(d => d.value);
      let arc = d3.arc().outerRadius(radius).innerRadius(0);

      // Add slices to the pie chart
      let arcs = svg.selectAll("arc")
        .data(pie(pieData))
        .enter()
        .append("g")
        .attr("class", "arc");

      arcs.append("path")
        .attr("d", arc)
        .attr("fill", d => colorScale(d.data.label))
        .attr("stroke", "white")
        .style("stroke-width", "2px");

      // Add labels
      arcs.append("text")
        .attr("transform", d => `translate(${arc.centroid(d)})`)
        .attr("text-anchor", "middle")
        .text(d => d.data.label)
        .style("fill", "white");
    }
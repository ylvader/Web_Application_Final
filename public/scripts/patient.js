// patient.js: Script that handles the patient page

window.changeActivePage = changeActivePage;
window.addNewExercise = addNewExercise;

// changeActivePage: Changes the active page between "Exercise data" and "Exercise videos"
// "Exercise data" is default from beginning
function changeActivePage(buttonClicked) {
    console.log(buttonClicked)

    if(buttonClicked === 'videos') { 
        // Display video-field, hide data
        document.getElementById("video_field").style.display = "block";
        document.getElementById("patients_data_field").style.display = "none";

        // Set the underline to "Exercise videos" to indicate that that page is active
        document.getElementById("menu_button_data").style.textDecorationColor = "white";
        document.getElementById("menu_button_videos").style.textDecorationColor = "rgb(27, 173, 98)";
    }
    else { 
        // Display data-field, hide videos
        document.getElementById("patients_data_field").style.display = "block";
        document.getElementById("video_field").style.display = "none";

        // Set the underline to "Exercise data" to indicate that that page is active
        document.getElementById("menu_button_videos").style.textDecorationColor = "white";
        document.getElementById("menu_button_data").style.textDecorationColor =  "rgb(27, 173, 98)";
    }

};

// Wedneysdays score = 26 October = Today's number of exercises
// In the future this should be replaced by the real patient data from the database
var Wednesday_score = 0;

// Weekly data
// In the future this should be replaced by the real patient data from the database
const data = [
  { name: 'Monday', score: 2 },
  { name: 'Tuesday', score: 3 },
  { name: 'Wednesday', score: Wednesday_score },
  { name: 'Thursday', score: 0 },
  { name: 'Friday', score: 0 },
  { name: 'Saturday', score: 0 },
  { name: 'Sunday', score: 0 },
];

// Define the data by month
// In the future this should be replaced by the real patient data from the database
var dataset1 = [
  [1,1], [2,3], [3,2],
  [4, 1], [5, 6], [6, 3],
  [7, 4], [8, 2], [9, 3],
  [10, 3], [11, 3], [12, 1],
  [13, 5], [14, 5], [15, 5],
  [16, 2], [17, 3], [18, 2],
  [19, 5], [20, 4], [21, 7],
  [22, 2], [23, 6], [24, 1],
  [25, 4], [26, Wednesday_score]
];

// addNewExercise: Adds a new exercise
function addNewExercise() {
  // Update the number of exercises for Wednesday 26th October
  // Should be the current date in the future
  Wednesday_score++;

  // Change the number of exercises today in the page
  document.getElementById("exercises_today").innerHTML = Wednesday_score;

  // Update the data for the week and month
  data[2].score = Wednesday_score;
  dataset1[25][1] = Wednesday_score;

  // Create a new bar chart with the new data
  create_bar_chart_week();

  // Remove the lines from the line chart to update it and create new ones
  removeFromLineChart();
  createLineChart();
}

// Create the bar chart, which shows number of exercises per week
// Inspiration from: https://github.com/kriscfoster/d3-barchart/blob/master/index.js
function create_bar_chart_week(){
  
  // Remove the bar chart if it exist in order to update the values in the graph
  d3.select("#patient_week_chart").select("svg").remove();
      
  // Set width, height and margins for the bar chart
  const width = 600;
  const height = 450;
  const margin = { top: 50, bottom: 50, left: 0, right: 40 };
      
  // Append these
  const svg = d3.select('#patient_week_chart')
    .append('svg')
    .attr('width', width - margin.left - margin.right)
    .attr('height', height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);
    
  // Scale x
  const x = d3.scaleBand()
    .domain(d3.range(data.length))
    .range([margin.left, width - margin.right])
    .padding(0.1)
      
  // Scale y lineary
  const y = d3.scaleLinear()
    .domain([0, 10])
    .range([height - margin.bottom, margin.top])
      
  // Append attributes and data
  svg
    .append("g")
    .attr("fill", 'royalblue')
    .selectAll("rect")
    .data(data) 
    .join("rect")
      .attr("x", (d, i) => x(i))
      .attr("y", d => y(d.score))
      .attr('title', (d) => d.score)
      .attr("class", "rect")
      .attr("height", d => y(0) - y(d.score))
      .attr("width", x.bandwidth());

  // Append x-label
  svg
    .append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
      .attr("x", width/2)
      .attr("y", height - 5)
      .style('font-family', 'Helvetica')
      .style('font-size', 15)
      .text("Day (Week 43)");

  // Append y-label
  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", 80)
    .attr("dy", "1em")
    .style('font-family', 'Helvetica')
    .style('font-size', 15)
    .text("Number of exercises");
  
  // Set y-axis
  function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .attr("font-size", '20px')
  }
  
  // Set x-axis
  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].name))
      .attr("font-size", '15px')
  }
      
  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node();     
}

// Remove the lines from the line chart to update it 
function removeFromLineChart() {
  d3.select('#linechart').selectAll('path').remove();
  d3.select('#linechart').selectAll('circle').remove();
}

// Create line chart to visualize exercises / month
// Only show data until the date that is today
// Inspiration from: https://www.educative.io/answers/how-to-create-a-line-chart-using-d3
function createLineChart() {
  // Define margin, width and height of the line chart
  var svg = d3.select("#linechart"),
      margin = 140,
      width = svg.attr("width")-margin, 
      height = svg.attr("height")-margin

  // Set scale: scaleLinear uses a linear equation to interpolate
  var xScale = d3.scaleLinear().domain([1, 26]).range([0, width]),
      yScale = d3.scaleLinear().domain([0, 10]).range([height, 0]);
    
  var g = svg.append("g")
      .attr('transform', 'translate(100,100) scale(1)')

  // Add x-label
  svg.append('text')
    .attr('x', width/2 + 100)
    .attr('y', height - 15 + 150)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text('Date (October)');

  // Add y-label
  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", 80)
    .attr("dy", "7em")
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text("Number of exercises");

  // Add the axes
  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

  g.append("g")
    .call(d3.axisLeft(yScale)); 

  // Add dots as circles for every data from the dataset
  svg.append('g')
    .selectAll("dot")
    .data(dataset1)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return xScale(d[0]); } ) // horizontal position of the circles
    .attr("cy", function (d) { return yScale(d[1]); } ) // vertical position of the circles
    .attr("r", 3) // radius of the circles
    .attr("transform", "translate(" + 100 + "," + 100 + ")")
    .style("fill", "#CC0000"); // color

  // Plot the lines     
  var line = d3.line()
    .x(function(d) { return xScale(d[0]); }) 
    .y(function(d) { return yScale(d[1]); }) 
    .curve(d3.curveMonotoneX)

  svg.append("path")
    .datum(dataset1) 
    .attr("class", "line") 
    .attr("transform", "translate(" + 100 + "," + 100 + ")")
    .attr("d", line)
    .style("fill", "none")
    .style("stroke", "#CC0000")
    .style("stroke-width", "2");
  }

// This function is called when the page is loaded
window.onload = () => {
    // Call function to set set up bar chart
    create_bar_chart_week();

    // Call funtion to set up line chart
    createLineChart();
 }
// patient.js: Script that handles the patient page
//import { getUser } from '/.../databaseConfig.js'

// changeActivePage: Changes the active page between "Exercise data" 
// and "Exercise videos"
// "Exercise data" is default from beginning

// if using js6 modules your html events attributes won't work. 
// in that case you must bring your function from global scope to module scope.
// https://stackoverflow.com/questions/17378199/uncaught-referenceerror-function-is-not-defined-with-onclick
window.changeActivePage = changeActivePage;
window.addNewExercise = addNewExercise;

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

// Add a new exercise
// @TODO: Connect to database
function addNewExercise() {
  // Update the number of exercises for the current date
  Wednesday_score++;
  console.log(Wednesday_score)

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

// addEventListener is better than onClick (@TODO: Improvement)
/* var el = document.getElementById("id");
el.addEventListener("click", function(){alert("click1 triggered")}, false);
el.addEventListener("click", function(){alert("click2 triggered")}, false); */

// Wedneysdays score = 26 October = Today's number of exercises
// @TODO: Get rid of this - Database
var Wednesday_score = 0;

// Weekly data (@TODO: Get rid of this - Database)
const data = [
  { name: 'Monday', score: 2 },
  { name: 'Tuesday', score: 3 },
  { name: 'Wednesday', score: Wednesday_score },
  { name: 'Thursday', score: 0 },
  { name: 'Friday', score: 0 },
  { name: 'Saturday', score: 0 },
  { name: 'Sunday', score: 0 },
];

// Connect to the database to fetch the patient's exercises
// Connect to the database (??)
// Can't be done in a script so how should I access the database?
// ---> Send data from and to server.js (using databaseConfig.js to access database)

// Create the bar chart, which shows number of exercises per week
// https://www.youtube.com/watch?v=BDpBAFvdjYo
function create_bar_chart_week(){
  
  // Remove the bar chart if it exist in order to update the values in the graph
  d3.select("#patient_week_chart").select("svg").remove();

  // Define the data (above)
  // Need to be replaced
  
  //const max = Math.max(data.score); // in domain
      
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
    .data(data) //data.sort((a, b) => d3.descending(a.score, b.score))
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
      
  function yAxis(g) {
    g.attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y).ticks(null, data.format))
      .attr("font-size", '20px')
  }
      
  function xAxis(g) {
    g.attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat(i => data[i].name))
      .attr("font-size", '15px')
  }
      
  svg.append("g").call(xAxis);
  svg.append("g").call(yAxis);
  svg.node();     
}

// Define the data by month
// @TODO: replace with database
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

function removeFromLineChart() {
  d3.select('#linechart').selectAll('path').remove();
  d3.select('#linechart').selectAll('circle').remove();
}

// Create line chart to visualize exercises / month
// Thanks to: https://www.educative.io/answers/how-to-create-a-line-chart-using-d3
function createLineChart() {
  // Define the data by month (above)
  // But only show until the date that is today
  // (For example, October has 31 days)

  // Define margin, width and height of the line chart
  var svg = d3.select("#linechart"),
      margin = 140,
      width = svg.attr("width")-margin, //(600-margin)
      height = svg.attr("height")-margin //(450-margin)

  // Set scale: scaleLinear uses a linear equation to interpolate
  var xScale = d3.scaleLinear().domain([1, 26]).range([0, width]),
      yScale = d3.scaleLinear().domain([0, 10]).range([height, 0]);
    
  var g = svg.append("g")
      .attr('transform', 'translate(100,100) scale(1)')

  // Add title by appending text to the svg,
  // then set position, style and text
  /*
  svg.append('text')
    .attr('x', width/2 + 100)
    .attr('y', 100)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 20)
    .text('Line Chart');
  */

  // Add x-label
  svg.append('text')
    .attr('x', width/2 + 100)
    .attr('y', height - 15 + 150)
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text('Date (October)');

  // Add y-label
  // Here using transform to rotate the text for the y-axis
  svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", 80)
    .attr("dy", "7em")
    .attr('text-anchor', 'middle')
    .style('font-family', 'Helvetica')
    .style('font-size', 12)
    .text("Number of exercises");

  // Add both of the axes
  // For the x-axis, we call d3.axisBottom 
  // because we need to align it at the bottom of the canvas
  g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

  // For the y-axis, we call d3.axisLeft 
  // because we want to align it to the left of the canvas.
  g.append("g")
    .call(d3.axisLeft(yScale));

  // Add dots for every coordinate from the data
  // We supply dataset1 to the data attribute and then make a circle for each coordinate.
  // The cx specifies the horizontal position of the circle,
  //  cy specifies the vertical position of the circle
  // r specifies the radius of the circle.
  svg.append('g')
    .selectAll("dot")
    .data(dataset1)
    .enter()
    .append("circle")
    .attr("cx", function (d) { return xScale(d[0]); } )
    .attr("cy", function (d) { return yScale(d[1]); } )
    .attr("r", 3)
    .attr("transform", "translate(" + 100 + "," + 100 + ")")
    .style("fill", "#CC0000"); // color

  // Plot the line by calling d3.line       
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

window.onload = () => {
    // Call function to set set up bar chart
    create_bar_chart_week();

    // Call funtion to set up line chart
    //create_line_chart_month();
    createLineChart();

    console.log("heeeeejj")

    // How to get the data from the database?
    //var pat_data = document.getElementById("patient_data");

    //console.log(pat_data[0]);
 }
// patient.js: Script that handles the patient page

// changeActivePage: Changes the active page between "Exercise data" 
// and "Exercise videos"
// "Exercise data" is default from beginning

// if using js6 modules your html events attributes won't work. 
// in that case you must bring your function from global scope to module scope.
// https://stackoverflow.com/questions/17378199/uncaught-referenceerror-function-is-not-defined-with-onclick
window.changeActivePage = changeActivePage;

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

//import * as d3 from "https://cdn.skypack.dev/d3@7";
//import axios from 'https://cdn.skypack.dev/axios';

//const div = d3.selectAll("div");

// Connect to the database to fetch the patient's exercises
// Connect to the database (??)
// Can't be done in a script so how should I access the database?

// Create the bar chart, which shows number of exercises per week
// https://www.youtube.com/watch?v=BDpBAFvdjYo
function create_bar_chart_week(){

    // Need to be replaced
    const data = [
        { name: 'Monday', score: 2 },
        { name: 'Tuesday', score: 3 },
        { name: 'Wednesday', score: 0 },
        { name: 'Thursday', score: 5 },
        { name: 'Friday', score: 1 },
        { name: 'Saturday', score: 3 },
        { name: 'Sunday', score: 10 },
      ];

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
          .attr("x", width)
          .attr("y", height - 27)
          .text("Day");

          // Append y-label
          svg.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("x", 80)
        .attr("dy", "1em")
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

window.onload = () => {
    // Call function to set set up bar chart
    create_bar_chart_week();

    console.log("hej")
 }
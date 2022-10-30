// spiral.js: Handles the spiral with patient data that are shown to researchers and physicians

var currentdatafile = "";

// This function creates the spiral
// Inspiration from: https://www.geeksforgeeks.org/d3-js-lineradial-curve-method/
function createSpiralbylineRadial(file) {
    d3.select('#spiral').selectAll('path').remove();

    var lineRadialGenerator = d3.lineRadial();

    // Define the data based on csv-file chosen
    // This should be real patient data from the database in the future
    if(file === "data1") {
        var data = [
            {angle: 0, radius: 10},
            {angle: 3.14 * .5, radius: 35},
            {angle: 3.14 * .75, radius: 55},
            {angle: 3.14, radius: 60},
            {angle: 3.14 * 1.25, radius: 65},
            {angle: 3.14 * 1.5, radius: 70},
            {angle: 3.14 * 1.75, radius: 75},
            {angle: null, radius: 80},
            {angle: 3.14 * 2.25, radius: 85},
            {angle: 3.14 * 2.5, radius: 90},
            {angle: 3.14 * 2.75, radius: 95},
            {angle: 3.14 * 3, radius: 100},
            {angle: 3.14 * 3.25, radius: 105},
            {angle: 3.14 * 3.5, radius: 110}
            ];
            currentdatafile = "Data 1";
            
            // Indicate which data that is shown by changing the colors of the buttons
            document.getElementById("button_data1").style.backgroundColor = "#386880";
            document.getElementById("button_data3").style.backgroundColor = "#4c8eaf";
            document.getElementById("button_data5").style.backgroundColor = "#4c8eaf";
    }
    else if (file === "data2") { //data3
        var data = [
            {angle: 0, radius: 12},
            {angle: 3.14 * .4, radius: 30},
            {angle: 3.14 * .74, radius: 52},
            {angle: 3.14, radius: 58},
            {angle: 3.14 * 1.23, radius: 64},
            {angle: 3.14 * 1.45, radius: 68},
            {angle: 3.14 * 1.73, radius: 70},
            {angle: null, radius: 76},
            {angle: 3.14 * 2.22, radius: 80},
            {angle: 3.14 * 2.54, radius: 92},
            {angle: 3.14 * 2.76, radius: 97},
            {angle: 3.14 * 3, radius: 100},
            {angle: 3.14 * 3.7, radius: 103},
            {angle: 3.14 * 3.8, radius: 112}
            ];
            currentdatafile = "Data 3";
            
            // Indicate which data that is shown by changing the colors of the buttons
            document.getElementById("button_data3").style.backgroundColor = "#386880";
            document.getElementById("button_data1").style.backgroundColor = "#4c8eaf";
            document.getElementById("button_data5").style.backgroundColor = "#4c8eaf";
    }
    else if (file === "data3") { //data5
        var data = [
            {angle: 0, radius: 9},
            {angle: 3.14 * .51, radius: 28},
            {angle: 3.14 * .76, radius: 50},
            {angle: 3.14, radius: 54},
            {angle: 3.14 * 1.26, radius: 59},
            {angle: 3.14 * 1.51, radius: 64},
            {angle: 3.14 * 1.76, radius: 71},
            {angle: null, radius: 78},
            {angle: 3.14 * 2.26, radius: 81},
            {angle: 3.14 * 2.51, radius: 87},
            {angle: 3.14 * 2.76, radius: 94},
            {angle: 3.14 * 3.1, radius: 99},
            {angle: 3.14 * 3.26, radius: 107},
            {angle: 3.14 * 3.51, radius: 115}
            ];
            currentdatafile = "Data 5";

            // Indicate which data that is shown by changing the colors of the buttons
            document.getElementById("button_data5").style.backgroundColor = "#386880";
            document.getElementById("button_data1").style.backgroundColor = "#4c8eaf";
            document.getElementById("button_data3").style.backgroundColor = "#4c8eaf";

    }
    // Create the spiral using d3's function "lineRadial"
    var lineRadialGenerator = d3.lineRadial()
       .angle((d) => d.angle)
       .radius((d) => d.radius)
       .curve(d3.curveCardinal)
           
    d3.select("#spiral")
       .select("g")
       .append("path")
       .attr("d", lineRadialGenerator(data))
       .attr("fill", "none")
       .attr("stroke", "royalblue");
}
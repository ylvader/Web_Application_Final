// index_script.js: Handles the page in index.ejs, which are shown to researchers and physicians

// The name of the role is set in the file index.ejs using a global variable "global.userID[0].username"
// Therefore, the name of the role is checked here.
// If it is a physician/doc, the RSS-field should not be visible
if(document.getElementById("Rolename").innerHTML == "doc") {
    document.getElementById("RSS_field").style.visibility = "hidden";
}

// ----- CSV-files -----
 
// Read and show CSV files in a table
function showTable (csvfile) {
    // Get the table-element by ID
    let table = document.getElementById("data-table")

    // Fetch the csv file based on the argument "csvfile"
    fetch("/data/" + csvfile + ".csv")
    .then(res => res.text())
    .then(csv => {
        console.log(csv)
    
    // Clear the table in case it is not empty
    table.innerHTML = "";

    // Generate table rows by splitting
    let rows = csv.split("\r");

    // Loop through rows and split columns
    for (let row of rows) {

        // Parse the columns using an expression with credits from: https://thegermancoder.com/2018/11/29/how-to-parse-csv-with-javascript/
        let cols = row.match(/(?:\"([^\"]*(?:\"\"[^\"]*)*)\")|([^\",]+)/g);
        
        // Check if columns are not null, if not: Insert rows and columns into the table
        if (cols != null) {
            let tr = table.insertRow();
            for (let col of cols) {
                let td = tr.insertCell();
                td.innerHTML = col.replace(/(^"|"$)/g, "");
            }
        }
    }
});

    // Set the close-button of the table to visible
    document.getElementById("closeTableButton").style.visibility = "visible";
}

// Close the table. Called when clicking on the close-button
function closeTable() {

    // Get the table-element by ID
    let table = document.getElementById("data-table");

    // Clear the table
    table.innerHTML = "";

    // Set the close-button of the table to invisible since the table is empty
    document.getElementById("closeTableButton").style.visibility = "hidden";
}

// This function is called in the beginning of loading the page
window.onload = () => {

    // Set close-button to hidden since no table is open from the beginning
   document.getElementById("closeTableButton").style.visibility = "hidden";
}
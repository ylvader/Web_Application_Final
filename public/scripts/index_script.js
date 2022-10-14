// index_script.js: Handles the page in index.ejs

// Variables to set different types of permissions
// Patient: Permission = 1, Physician: Permission = 2, Researcher: Permission = 3
let permission = 0;

// The name of the role is set in the file index.ejs using a global variable "global.userID[0].username"
// Therefore, the name of the role is checked here.
// Set permissions based on role
function setPermission() {
    if(document.getElementById("Rolename").innerHTML == "patient1" || document.getElementById("Rolename").innerHTML == "patient2") {
        permission = 1;
    }
    else if(document.getElementById("Rolename").innerHTML == "doc") {
        permission = 2;
    }
    else if(document.getElementById("Rolename").innerHTML == "researcher") {
        permission = 3;
    }
}

// Set up which resources to be shown based on permissions
function setResources() {
    if (permission == 1) { // Patient
        document.getElementById("patient_field").style.display = "block";
    }
    if (permission == 2) { // Doc
        document.getElementById("data_field").style.display = "block";
    }
    else if (permission == 3) { // Researcher
        document.getElementById("data_field").style.display = "block";

        document.getElementById("RSS_field").style.display = "block";
    }
    else {

    }
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
    document.getElementById("closeTableButton").style.display= "inline";
}

// Close the table. Called when clicking on the close-button
function closeTable() {

    // Get the table-element by ID
    let table = document.getElementById("data-table");

    // Clear the table
    table.innerHTML = "";

    // Set the close-button of the table to invisible since the table is empty
    document.getElementById("closeTableButton").style.display = "none";
}

// This function is called in the beginning of loading the page
window.onload = () => {
   // Call function to set the permissions
   setPermission();

   // Then set up which resources to be shown based on permissions
   setResources();

   console.log(userName[0].username);
}
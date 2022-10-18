// researcher.js: Script that handles the researchers page

// changeActivePage: Changes the active page between "Exercise data" 
// and "Notes". "Exercise data" is default from beginning

// if using js6 modules your html events attributes won't work. 
// in that case you must bring your function from global scope to module scope.
// https://stackoverflow.com/questions/17378199/uncaught-referenceerror-function-is-not-defined-with-onclick
window.changeActivePage = changeActivePage;

function changeActivePage(buttonClicked) {
    console.log(buttonClicked)

    if(buttonClicked === 'notes') { 
        // Display video-field, hide data
        document.getElementById("notes_field").style.display = "block";
        document.getElementById("generated_data_field").style.display = "none";

        // Set the underline to "Exercise videos" to indicate that that page is active
        document.getElementById("menu_button_data").style.textDecorationColor = "white";
        document.getElementById("menu_button_videos").style.textDecorationColor = "rgb(27, 173, 98)";
    }
    else { 
        // Display data-field, hide videos
        document.getElementById("generated_data_field").style.display = "block";
        document.getElementById("notes_field").style.display = "none";

        // Set the underline to "Exercise data" to indicate that that page is active
        document.getElementById("menu_button_videos").style.textDecorationColor = "white";
        document.getElementById("menu_button_data").style.textDecorationColor =  "rgb(27, 173, 98)";
    }

};
// researcher.js: Script that handles the researchers page

// changeActivePage: Changes the active page between "Exercise data" 
// and "Notes". "Exercise data" is default from beginning

// if using js6 modules your html events attributes won't work. 
// in that case you must bring your function from global scope to module scope.
// https://stackoverflow.com/questions/17378199/uncaught-referenceerror-function-is-not-defined-with-onclick
window.changeActivePage = changeActivePage;
window.addNewNote = addNewNote;

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


// currentdatafile is from spiral.js to know which script is active
// Add a new note
function addNewNote() {
    console.log("addnew")
    console.log(currentdatafile);

    // If "currentdatafile" is empty, then no file is chosen
    if (currentdatafile === "") {
        alert("You must choose a file first");
    }
    else {
    // Ask the user to enter a notation using "prompt"
        var note = prompt("Enter data annotation for file " + currentdatafile,
                "Note here");
        if (note != null) {
            document.getElementById("g").innerHTML = "You added the note: '" + note + "'";
            // Render the new note in the HTML if it is not empty
            renderNewNote(note);
        }
    }
}

// Render a new note in the list of notes
function renderNewNote(note) {

    // Create a new div-element
    var note_div = document.createElement('div');
    // Set class
    note_div.className = 'my_note'; 
    // Set it before the first div right now
    one_note.before(note_div);

    // Create p-element
    var note_file = document.createElement('p');

    // Set it to be the current data file
    note_file.innerHTML = currentdatafile;
    
    note_file.setAttribute('class', 'note_data'); 
    note_div.appendChild(note_file);

    // Create p-element
    var note_text = document.createElement('p');

    // Set it to be the current note
    note_text.innerHTML = note;
    // better to use CSS though - just set class
    note_text.setAttribute('class', 'note_text'); // and make sure myclass has some styles in css
    note_div.appendChild(note_text);

    // Change the first div in the list to the one that just was added
    const the_first_div_before = document.getElementById('one_note');
    the_first_div_before.removeAttribute('id');
    note_div.setAttribute('id', 'one_note');
}
var mysql = require('mysql');
require('dotenv').config();

// Connect to the database
var mysql_con = mysql.createConnection({
  host: "localhost",
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

mysql_con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the database in databaseConfig");
  });

// Get user (Send ClientID from passportConfig?)
function getUser(client_ID) {
  const [user] = mysql_con.query(`
  SELECT username 
  FROM user
  WHERE clientID = ?
  `, [client_ID]);
  return user[0]
}

module.exports = { getUser };

// Get patient data (several functions for day/week/month/all?)
// + id
// https://stackoverflow.com/questions/71300239/how-to-return-the-results-of-mysql-query-using-express-js

//https://www.geeksforgeeks.org/how-to-run-synchronous-queries-using-sync-sql-module-in-node-js/
async function getPatientData(func) {


  
  var dates = [];
  const res = await mysql_con.query("SELECT * FROM pd_db.therapy as therapy, pd_db.test as test Where therapy.therapyID = test.Therapy_IDtherapy and therapy.User_IDpatient = 3", (err,res,fields) => {func(res);});
  console.log("hej");
  return res;
  //console.log(res[0]);
  
}

module.exports = { getPatientData };

// Create patient data
async function createPatientData(testID, dateTime, Therapy_IDtherapy) {
  await mysql_con.query("INSERT INTO test (testID, dateTime, Therapy_IDtherapy) VALUES (?, ?,?)", [testID, dateTime, Therapy_IDtherapy])
  return getPatientData();
}

// Get notes (data annotation (for the researcher))
// noteID, Test_Session_IDtest_session, note, User_IDmed 
async function getNotes(userID) {
  const [notes] = await mysql_con.query(`
  SELECT * 
  FROM notes
  WHERE User_IDmed = ?
  `, [userID]);
  return notes[0]
}

// Create note
async function createNote(noteID, Test_Session_IDtest_session, note, User_IDmed) {
  const [newNote] = await mysql_con.query(`
  INSERT INTO notes (noteID, Test_Session_IDtest_session, note, User_IDmed)
  VALUES (?, ?, ?, ?)
  `, [noteID, Test_Session_IDtest_session, note, User_IDmed]);
  const id = newNote.User_IDmed; //not needed?
  return getNotes(User_IDmed)
}

/*
mysql_con.query("SELECT username FROM user WHERE clientID = ?", [profile.id], (err, user) => {
  if(err) {
      console.log("Error in finding user with Google-account")
      return done(err);
  }
  else if(user) { // User exists
      console.log("Google user exists");
      // Set the username that is retrieved from the database
      global.userName = user;
      return done(null, user); 
  }
  else { // Redirect user
      // User don't have a Google account
      return done(null);
  }
})
*/

// Annan lösning
/*
config = {
        host: "localhost",
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    }

var connection = mysql.createConnection(config); //added the line
  connection.connect(function(err){
    if (err){
      console.log('Error connecting to database');
    }
      console.log('connected successfully to DB.');
  });
    
    module.exports ={
         connection : mysql.createConnection(config) 
    }*/
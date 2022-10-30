// databaseConfig.js: Handles various database requests
// Should be used in the future

var mysql = require('mysql');
require('dotenv').config();

// Connect to the database
var mysql_con = mysql.createConnection({
  host: "localhost",
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

/*
mysql_con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the database in databaseConfig");
  });
*/

// Get user
function getUser(client_ID) {
  const user = mysql_con.query(`
  SELECT username 
  FROM user
  WHERE clientID = ?
  `, [client_ID]);
  return user;
}

// Get patient data
async function getPatientData(func) {
  const res = await mysql_con.query("SELECT dateTime FROM pd_db.therapy as therapy, pd_db.test as test Where therapy.therapyID = test.Therapy_IDtherapy and therapy.User_IDpatient = 3", (err,res,fields) => {func(res);});
  console.log("getPatientData");
  return res;
}

// Create patient data
async function createPatientData(testID, dateTime, Therapy_IDtherapy) {
  await mysql_con.query("INSERT INTO test (testID, dateTime, Therapy_IDtherapy) VALUES (?, ?,?)", [testID, dateTime, Therapy_IDtherapy])
  return getPatientData();
}

// Get notes (data annotation (for the researcher))
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
  const id = newNote.User_IDmed;
  return getNotes(User_IDmed)
}

// Export the functions
module.exports = { getPatientData,
  getUser,
  createPatientData,
  getNotes, 
  createNote
 };
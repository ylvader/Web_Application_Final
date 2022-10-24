// Server.js: Handles routing and hosting

// Check if we run in the production environment or not
if(process.env.NODE_ENV !== 'production') {
  // Loads all the variables from the .env-file
  require('dotenv').config();
}

// Imports: Express, Passport
const express = require('express');
const passport = require('passport');
require('./passportConfig')(passport);
var session = require('express-session');

const app = express()

// Tell app to use the public directory for the static files, e.g. css/js/images/csv-files
app.use(express.static(__dirname + '/public'));

// Database
//import { getUser, getPatientData, createPatientData, getNotes, createNote } from './databaseConfig.js'
var db = require('./databaseConfig.js');
var patient_data_dateTime = db.getPatientData(console.log);

// Send patient data (@TODO: Does not work properly)
app.get('/patient', async (req, res) => {
  const patientData = patient_data_dateTime;
  res.render('patient', { patientData: patientData })
})

/*
app.get('/scripts/patient.js', function(req, res) {
  res.set('Content-Type', 'application/javascript');
  res.render('patient', { myVar : "prutt" });
});
*/
// Import the routers into the server
const loginRouter = require('./routes/login')
const indexRouter = require('./routes/index')
const videosRouter = require('./routes/videos')
const rssfeedRouter = require('./routes/RSSfeed')
const patientRouter = require('./routes/patient')
const researcherRouter = require('./routes/researcher')
const docsresearcherRouter = require('./routes/docs_researchers')
const docRouter = require('./routes/doc')

// Set the view engine to ejs
app.set('view engine', 'ejs')

// Set up Authentication using the authentication middleware for Node.js Passport
// (Google OAuth, GitHub, Facebook)

// Setup Express Session Authentication
app.use(session({
  secret: process.env.secret,
  resave: false,
  saveUninitalized: true
}))

app.use(passport.initialize());
app.use(passport.session());

// Set up routing for authentication with Google, GitHub and FaceBook
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/github', passport.authenticate('github', { scope: ['profile', 'email'] }));
app.get('/auth/facebook', passport.authenticate('facebook'));

// @TODO: If user logged in successfully, it will enter the '/index'-page, otherwise it will redirect to the login page
// (Right now to their own "pages")
app.get('/auth/google/callback', passport.authenticate('google', { //(Patient2)
    successRedirect: '/patient',
    failureRedirect: '/'
}));

app.get('/auth/github/callback', passport.authenticate('github', {//(Researcher)
  successRedirect: '/researcher', 
  failureRedirect: '/'
}));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {//(Doc)
  successRedirect: '/doc', 
  failureRedirect: '/'
}));

// Set up the routes
app.use('/', loginRouter); // Start page as login
app.use('/index', indexRouter);
app.use('/RSSfeed', rssfeedRouter);
app.use('/videos', videosRouter);
app.use('/patient', patientRouter);
app.use('/researcher', researcherRouter);
app.use('/docs_researchers', docsresearcherRouter);
app.use('/doc', docRouter);

// Make the app listen to port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
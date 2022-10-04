// Check if we run in the production environment or not
// NEED TO HOST
if(process.env.NODE_ENV !== 'production') {
  //Set up the dependecies
  // Loads all the variables from the .env-file
  //imports it to the process process.env.DATABASE_URL
  require('dotenv').config();
}

// To host: npm run dev

// Set up express. This is gonna pull the express library. import express
const express = require('express');
const expressLayouts = require('express-ejs-layouts') //maybe remove and create CSS
const passport = require('passport');
var session = require('express-session');
var mysql = require('mysql');

const app = express()
require('./passportConfig')(passport);

// Tell app to use the public directory for the static files, e.g. css/js/images
// Patient files
app.use(express.static(__dirname + '/public'));

// Import the routers into the server.
// must hookup the router, the server does not know the router exists without it
// indexRouter will be set to the router-variable in index.js-file
const loginRouter = require('./routes/login')
const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const videosRouter = require('./routes/videos')

//Set up the database
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "dbuser",
  password: "hejsan",
  database: "pd_db"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  con.query("SELECT userID FROM role, user WHERE user.Role_IDrole = role.roleId and user.clientId LIKE '106084874984399345388'", function (err, result, fields) {
    if (err) throw err;
    console.log("lyckats")
    console.log(result);
  });
});




// Middleware
// set the view engine to ejs
app.set('view engine', 'ejs')

// Passport (Google OAuth)
// https://github.com/theamazinglesson/nodejs-google-oauth
// Middleware
app.use(session({ // Look into (deprecated)
  secret: 'secret',
  resave: false,
  saveUninitalized: true
}))

app.use(passport.initialize());
app.use(passport.session());
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/videos',
    failureRedirect: '/'
}));
// Set up the routes
app.use('/', loginRouter); // Start page as login
app.use('/auth', usersRouter);
app.use('/index', indexRouter);
app.use('/videos', videosRouter);

// Make the app listen to port 3000
// process.env.PORT: which is gonna deploy
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// ----Removed:------
/*
// Another way to do it
/*
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/login', (req, res) => {
  res.render('login')
})
*/

// here we gonna store our users
// don't do in a real application - this want do be stored in a database somewhere
// @TODO: ADD database
//const users = []

//Create route
// get all of our users
// when you create a real application your not gonna do this because this shows passwords and so on,
// just for testing
// req = request, res = response
/*
app.get('/users', (req, res) => {
  res.json(users) //send our users
})
*/


//set where our view is coming from, in our view-directory
//dirname = current directory name + view folder
//app.set('views', __dirname + '/views')

//hookup express layouts. Idea: Every single file is gonna be put in the layout file. So we don't have to duplicate the
// beginning-HTML and ending-HTML (such as header and footer)
// inside layouts/layout
//app.set('layout', 'layouts/layout')
//app.use(expressLayouts) //use express-layouts
//app.set("layout login", false);

// where our public files are gonna be: stylesheets, javascripts, images . folder public
//app.use(express.static('public'))


/*
const mongoose = require('mongoose') // import mongodb/mongoose

// Set up the connection:
// useNewUrlParser: gonna come from environment variables and the next thing is options how we are gonna set up mongodb inside of our app
// because without it uses a older way to set up mongodb
// depending on version useNewUrlParser may not be needed anymore, look when he uploaded. Figure it out by playing
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})

//access connection
const db = mongoose.connection
// if we run on an error when accessing to the database, we print out the error
db.on('error', error => console.error(error))
// runs one time, when we open up our database for the first time
db.once('open', () => console.log('Connected to Mongoose'))
*/

// Create the roles, users into the database
/*
const createPersonalData = require('./database/PersonalData.js');
createPersonalData.createRoles();
createPersonalData.createUsers();
*/
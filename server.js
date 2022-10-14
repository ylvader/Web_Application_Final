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

// Import the routers into the server
const loginRouter = require('./routes/login')
const indexRouter = require('./routes/index')
const videosRouter = require('./routes/videos')
const rssfeedRouter = require('./routes/RSSfeed')

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

// If user logged in successfully, it will enter the '/index'-page, otherwise it will redirect to the login page
app.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/index',
    failureRedirect: '/'
}));

app.get('/auth/github/callback', passport.authenticate('github', {
  successRedirect: '/index', 
  failureRedirect: '/'
}));

app.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/index', 
  failureRedirect: '/'
}));

// Set up the routes
app.use('/', loginRouter); // Start page as login
app.use('/index', indexRouter);
app.use('/RSSfeed', rssfeedRouter);
app.use('/videos', videosRouter);

// Make the app listen to port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
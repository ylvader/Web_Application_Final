// passportConfig.js: Configures Passport, which is an authentication middleware for Node.js.
// Here using the Passport strategies Google, Github and Facebook

// Imports: Google OAuth20, Github2, Facebook and MySQL
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
var mysql = require('mysql');

// Connect to the database
var mysql_con = mysql.createConnection({
  host: "localhost",
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

mysql_con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to the database");
  });

// Global variable to keep track of the user's username, which is the role of the user
global.userName = 0;

// Configure Passport
module.exports = (passport) => {
    
    // Google (Now conntected to Patient2)
    // Create a new GoogleStrategy
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
        async function (accessToken, refreshToken, profile, done) {
            // Find user in the database by comparing the clientID in the database with the Google-ID
           process.nextTick(function() {
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
           })
        }
    ));

    // GitHub (Now conntected to Researcher)
    // Create a new GitHubStrategy
    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/github/callback"
    },
        async function (accessToken, refreshToken, profile, done) {
            // Find user in the database by comparing the clientID in the database with the GitHub-ID
           process.nextTick(function() {
            mysql_con.query("SELECT username FROM user WHERE clientID = ?", [profile.id], (err, user) => {
                if(err) {
                    console.log("Error in finding user with GitHub-account")
                    return done(err);
                }
                else if(user) { // User exists
                    console.log("GitHub user exists");
                    // Set the username that is retrieved from the database
                    global.userName = user;
                    return done(null, user);
                }
                else { // Redirect user
                    // User don't have a GitHub account
                    return done(null);
                }
             })
           })
        }
    ));

    // Facebook (Now conntected to Doc)
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
        async function (accessToken, refreshToken, profile, done) {
            // Find user in the database by comparing the clientID in the database with the Facebook-ID
           process.nextTick(function() {
            mysql_con.query("SELECT username FROM user WHERE clientID = ?", [profile.id], (err, user) => {
                if(err) {
                    console.log("Error in finding user with Facebook-account")
                    return done(err);
                }
                else if(user) { // User exists
                    console.log("Facebook user exists");
                    // Set the username that is retrieved from the database
                    global.userName = user;
                    return done(null, user);  
                }
                else { // Redirect user
                    // User don't have a Facebook account
                    return done(null);
                }
             })
           })
        }
    ));

    // Serialize the user (store the data of the user object)
    passport.serializeUser(function (user, done){
        console.log("Inside serializeUser");
        done(null, user)
    });

    // Deserialize the user (find the data of the user object)
    passport.deserializeUser(function (user, done) {
        console.log("Inside deserializeUser");
        done(null, user);
    });
}
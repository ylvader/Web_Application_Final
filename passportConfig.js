// passportConfig.js: Configures passport
// Passport is authentication middleware for Node.js.
// A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more.

// My Google-information
/*
id: '106084874984399345388',
displayName: 'Y D',
name: { familyName: 'D', givenName: 'Y' },
photos: [
  {
    value: 'https://lh3.googleusercontent.com/a/ALm5wu1dP3Z6Ewpx4QeEb58qmh5XNAHdGCylXyKcvjMn=s96-c'
  }
],*/

//@TODO: Make passwords secure (****) when Github:ing
// https://www.youtube.com/watch?v=7K9kDrtc4S8

var mysql = require('mysql');

var mysql_con = mysql.createConnection({
  host: "localhost",
  user: "dbuser",
  password: "hejsan",
  database: "pd_db"
});

mysql_con.connect(function(err) {
    if (err) throw err;
    console.log("Connecteeed!");
  });

const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
        async function (accessToken, refreshToken, profile, done) {
            
            // console.log("Trying to access google account ", profile);

            // Find user in the database
           process.nextTick(function() {
            mysql_con.query("SELECT userID FROM user WHERE clientID = ?", [profile.id], (err, user) => {
                if(err) {
                    console.log("fis")
                    return done(err);
                }
                else if(user) { // User exists
                    console.log(user);
                    return done(null, user);
                    console.log("heej")

                    //console.log(user.Role_IDrole)
                    
                    /*
                    // Check which role the user has
                    mysql_con.query("SELECT roleID FROM role, user where Role_IDrole = roleId AND clientID = ?", [profile.id], (err, roleID) => {
                    if(err) {
                        console.log("error")
                        return done(err);
                    }
                    else if(roleID==1) { //User has a Patient-role: Show Youtube videos
                        console.log(roleID)
                        console.log("hejhej")
                        //res.redirect('/login')
                    }
                    })
                    */
                }
                else { // Redirect user
                    // You don't have a Google account
                    return done(null);
                }
             })

           })
        }
    ));

    // Twitter

    // Github

    // serializeUser determines which data of the user object should be stored in the session.
    passport.serializeUser((user,done)=>{
        console.log("inside serialize");
        done(null, user)
    });

    // In deserializeUser that key is matched with the in memory array / database or any data resource.
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
}

/**
 * module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
        async function (accessToken, refreshToken, profile, done) {

            // console.log("Trying to access google account ", profile);

            // Find user in the database
            try {
                let googleUser = await UserModel.findOne({ googleId: profile.id });
                if (googleUser) {
                    console.log("Google-User is in the database");
                    done(null, googleUser);
                } else {
                // If the user is not found, create a new google-user (don't want it here)
                // Should be "You're not connected with a google account"
                    const newGoogleUser = { 
                        googleId: profile.id,
                        name: profile.displayName
                    };
                    googleUser = await UserModel.create(newGoogleUser);
                    console.log("Creating new user with Google authentication");
                    done(null, googleUser);
                }
            } catch (err) {
                console.error(err);
            }
        }
    ));
 */



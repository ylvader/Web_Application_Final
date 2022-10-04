const mongoose = require("mongoose");

// My Google-Information:
/*
id: '106084874984399345388',
displayName: 'Y D',
name: { familyName: 'D', givenName: 'Y' },
photos: [
  {
    value: 'https://lh3.googleusercontent.com/a/ALm5wu1dP3Z6Ewpx4QeEb58qmh5XNAHdGCylXyKcvjMn=s96-c'
  }
],*/

// This in an own model/schema or in "User" directly?
// But users have different authentication methods...
const auth_methodSchema = mongoose.Schema({
    google: {
        googleId: {
        type: String,
        required: true
        }
     },
    github: {
        gitId: {
            type: String,
            required: true
        }
    },
    twitter: {
        twitterId: {
            type: String,
            required: true
        }
     }
});

module.exports = mongoose.model("auth_method", auth_methodSchema);
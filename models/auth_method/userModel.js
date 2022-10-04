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

// UserModel For Google
const userModelSchema = mongoose.Schema({
    googleId: {
        type: String,
        required: true
     },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("userModel", userModelSchema);
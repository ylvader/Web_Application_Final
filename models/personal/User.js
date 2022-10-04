const mongoose = require("mongoose");
const auth_method = require("../auth_method/auth_method");

// @TODO: What should Role and Organization be? A schema or not?
// How to check the user's authentication-method? Implement here? New schema?
// But users have different authentication methods...

const userSchema = mongoose.Schema({
  userID: {
    type: Number,
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  //Role,
  //organizationSchema,
  Lat: {
    type: Number
  },
  Long: {
    type: Number
  },
  auth_method
});

// Export the schema
module.exports = mongoose.model("User", userSchema);
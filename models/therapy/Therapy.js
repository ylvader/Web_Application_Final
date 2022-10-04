const mongoose = require("mongoose");

const therapySchema = mongoose.Schema({
    therapyID: {
      type: Number,
      required: true
    },
    userSchema: {
        roleSchema //User_IDpatient
    },
    userSchema: {
        // User_IDmed
    },
    therapy_ListSchema
  });
  
  module.exports = mongoose.model("Therapy", therapySchema);
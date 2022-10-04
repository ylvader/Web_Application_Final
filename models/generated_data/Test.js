const mongoose = require("mongoose");

const testSchema = mongoose.Schema({
    testID: {
      type: Number,
      required: true
    },
    dateTime: {
      type: Date,
      required: true
    },
    therapySchema //id therapy
  });
  
  module.exports = mongoose.model("Test", testSchema);
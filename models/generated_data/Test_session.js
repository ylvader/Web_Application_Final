const mongoose = require("mongoose");

const test_SessionSchema = mongoose.Schema({
    test_SessionID: {
      type: Number,
      required: true
    },
    type: {
      type: Number,
      required: true
    },
    testSchema, //id Test
    dataURL: {
        type: String,
        required: true
    }
  });
  
  module.exports = mongoose.model("Test_Session", test_SessionSchema);
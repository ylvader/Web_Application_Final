const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
    noteID: {
      type: Number,
      required: true
    },
    test_SessionSchema, //ID_testsession
    note: {
        type: String, //longtext
        required: true
    },
    userSchema //useridmedicine?
  });
  
  module.exports = mongoose.model("Note", noteSchema);
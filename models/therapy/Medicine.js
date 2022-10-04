const mongoose = require("mongoose");

const medicineSchema = mongoose.Schema({
    medicineID: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  });
  
  module.exports = mongoose.model("Medicine", medicineSchema);
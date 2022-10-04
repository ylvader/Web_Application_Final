const mongoose = require("mongoose");

const therapy_ListSchema = mongoose.Schema({
    therapy_ListID: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    medicineSchema,
    dosage: {
        type: String,
        required: true
    }
  });
  
  module.exports = mongoose.model("Therapy_List", therapy_ListSchema);
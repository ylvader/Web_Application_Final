const mongoose = require("mongoose");

const roleSchema = mongoose.Schema({
    roleID: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    type: {
        type: String,
        required: true
    }
  });

module.exports = mongoose.model("Role", roleSchema);
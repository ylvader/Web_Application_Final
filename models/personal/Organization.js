const mongoose = require("mongoose");

const organizationSchema = mongoose.Schema({
    OrganizationID: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  });

module.exports = mongoose.model("Organization", organizationSchema);
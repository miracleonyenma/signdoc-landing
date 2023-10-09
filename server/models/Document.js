const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    file_url: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Document || mongoose.model("Document", DocumentSchema);
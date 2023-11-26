const { Schema, model } = require("mongoose");

const DocumentSchema = new Schema(
  {
    _id: String,
    data: Object,
  },
  { collection: "gdocs-documents" }
);

module.exports = model("Document", DocumentSchema);

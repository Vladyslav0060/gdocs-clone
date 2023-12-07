const { Schema, model } = require("mongoose");

const DocumentSchema = new Schema(
  {
    _id: String,
    creator_id: String,
    name: String,
    data: Object,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { collection: "gdocs-documents" }
);

module.exports = model("Document", DocumentSchema);

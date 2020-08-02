const { Schema, model } = require("mongoose");

const TodoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    //user: { type: String }
  },
  { timestamps: true }
);

module.exports = model("Todo", TodoSchema);

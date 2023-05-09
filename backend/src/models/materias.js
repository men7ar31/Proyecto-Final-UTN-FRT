const { Schema, model } = require("mongoose");
const mongoose = require('mongoose');

const materiasSchema = new Schema(
  {
    name: String,
    plan: String,
    ano: String,
    userId: String
  },
  {
    timestamps: true,
  }
);

module.exports = model("Materia", materiasSchema);

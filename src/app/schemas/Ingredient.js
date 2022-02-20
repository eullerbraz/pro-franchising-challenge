const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  name: String,
  measure: String,
  unitPrice: String,
}, { versionKey: false });

module.exports = IngredientSchema;

const mongoose = require('mongoose');
const IngredientSchema = require('./Ingredient');

const ComponentSchema = new mongoose.Schema({
  ingredient: IngredientSchema,
  quantity: Number,
}, { versionKey: false });

module.exports = ComponentSchema;

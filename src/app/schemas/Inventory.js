const mongoose = require('mongoose');
const IngredientSchema = require('./Ingredient');

const InventorySchema = new mongoose.Schema({
  ingredient: IngredientSchema,
  quantity: Number,
}, { versionKey: false });

module.exports = InventorySchema;

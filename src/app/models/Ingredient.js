const mongoose = require('mongoose');

const IngredientSchema = require('../schemas/Ingredient');

module.exports = mongoose.model('Ingredient', IngredientSchema);

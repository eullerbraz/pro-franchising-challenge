const mongoose = require('mongoose');
const ComponentSchema = require('./Component');

const ProductSchema = new mongoose.Schema({
  name: String,
  image: String,
  price: Number,
  ingredients: [ComponentSchema],
}, { versionKey: false });

module.exports = ProductSchema;

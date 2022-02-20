const mongoose = require('mongoose');

const ProductSchema = require('../schemas/Product');

module.exports = mongoose.model('Product', ProductSchema);

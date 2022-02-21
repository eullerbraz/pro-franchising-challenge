const mongoose = require('mongoose');

const InventorySchema = require('../schemas/Inventory');

module.exports = mongoose.model('Inventory', InventorySchema);

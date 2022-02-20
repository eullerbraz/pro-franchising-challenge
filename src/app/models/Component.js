const mongoose = require('mongoose');

const ComponentSchema = require('../schemas/Component');

module.exports = mongoose.model('Component', ComponentSchema);

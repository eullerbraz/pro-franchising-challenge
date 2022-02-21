const express = require('express');
const rescue = require('express-rescue');

const InventoryController = require('../controllers/Inventory');

const router = express.Router({ mergeParams: true });

router.get('/', rescue(InventoryController.getAll));
router.post('/', rescue(InventoryController.create));
router.get('/:id', rescue(InventoryController.findById));
router.put('/:id', rescue(InventoryController.update));
router.delete('/:id', rescue(InventoryController.remove));

module.exports = router;

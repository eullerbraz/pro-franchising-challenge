const express = require('express');
const rescue = require('express-rescue');

const InventoryController = require('../controllers/Inventory');
const auth = require('../middlewares/auth');

const router = express.Router({ mergeParams: true });

router.get('/', rescue(InventoryController.getAll));
router.post('/', rescue(auth), rescue(InventoryController.create));
router.get('/:id', rescue(InventoryController.findById));
router.put('/:id', rescue(auth), rescue(InventoryController.update));
router.delete('/:id', rescue(auth), rescue(InventoryController.remove));

module.exports = router;

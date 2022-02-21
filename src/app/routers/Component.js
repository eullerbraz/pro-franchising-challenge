const express = require('express');
const rescue = require('express-rescue');

const ComponentController = require('../controllers/Component');

const router = express.Router({ mergeParams: true });

router.get('/', rescue(ComponentController.getAll));
router.post('/', rescue(ComponentController.create));
router.get('/:id', rescue(ComponentController.findById));
router.put('/:id', rescue(ComponentController.update));
router.delete('/:id', rescue(ComponentController.remove));

module.exports = router;

const express = require('express');
const rescue = require('express-rescue');

const ComponentController = require('../controllers/Component');
const auth = require('../middlewares/auth');

const router = express.Router({ mergeParams: true });

router.get('/', rescue(ComponentController.getAll));
router.post('/', rescue(auth), rescue(ComponentController.create));
router.get('/:id', rescue(ComponentController.findById));
router.put('/:id', rescue(auth), rescue(ComponentController.update));
router.delete('/:id', rescue(auth), rescue(ComponentController.remove));

module.exports = router;

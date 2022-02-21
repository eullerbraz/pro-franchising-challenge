const express = require('express');
const rescue = require('express-rescue');

const IngredientController = require('../controllers/Ingredient');
const auth = require('../middlewares/auth');

const router = express.Router({ mergeParams: true });

router.get('/', rescue(IngredientController.getAll));
router.post('/', rescue(auth), rescue(IngredientController.create));
router.get('/:id', rescue(IngredientController.findById));
router.put('/:id', rescue(auth), rescue(IngredientController.update));
router.delete('/:id', rescue(auth), rescue(IngredientController.remove));

module.exports = router;

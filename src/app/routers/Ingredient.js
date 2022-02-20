const express = require('express');
const rescue = require('express-rescue');

const IngredientController = require('../controllers/Ingredient');

const router = express.Router({ mergeParams: true });

router.get('/', rescue(IngredientController.getAll));
router.post('/', rescue(IngredientController.create));
router.get('/:id', rescue(IngredientController.update));
router.put('/:id', rescue(IngredientController.update));
router.delete('/:id', rescue(IngredientController.remove));

module.exports = router;

const IngredientService = require('../services/Ingredient');

const getAll = async (_req, res) => {
  const ingredients = await IngredientService.getAll();

  return res.status(200).json(ingredients);
}

const create = async (req, res, next) => {
  const {code, message, ingredient} = await IngredientService.create(req.body);

  if (message) return next({ message, code });

  return res.status(201).json(ingredient);
}

const findById = async (req, res, next) => {
  const { id } = req.params;
  const {code, message, ingredient} = await IngredientService.findById(id, req.body);

  if (message) return next({ message, code });

  return res.status(200).json(ingredient);
}

const update = async (req, res, next) => {
  const { id } = req.params;
  const {code, message, ingredient} = await IngredientService.update(id, req.body);

  if (message) return next({ message, code });

  return res.status(200).json(ingredient);
}

const remove = async (req, res, next) => {
  const { id } = req.params;
  const { ingredient, message, code } = await IngredientService.remove(id);

  if (message) return next({ message, code });

  return res.status(200).json(ingredient);
}

module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
}

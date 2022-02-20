const Joi = require('joi');

const IngredientModel = require('../models/Ingredient');

const validateIngredient = (ingredient) => Joi.object({
  name: Joi.string().not().empty().required(),
  measure: Joi.string().not().empty().required(),
  unitPrice: Joi.number().required(),
}).validate(ingredient);

const getAll = async () => {
  const ingredients = await IngredientModel.find({});

  return ingredients;
}

const create = async (ingredient) => {
  const { error } = validateIngredient(ingredient);

  if (error) {
    const [{ message }] = error.details;
    return { message, code: 400 };
  }

  const created = await IngredientModel.create(ingredient);

  return { ingredient: created }
}

const findById = async (id) => {
  const found = await IngredientModel.findByIdAndUpdate(id);

  if (!found) return { message: 'Invalid id', code: 400 }

  return { ingredient: found} 
}

const update = async (id, ingredient) => {
  const { error } = validateIngredient({ ...ingredient, createDate: new Date()});

  if (error) {
    const [{ message }] = error.details;
    return { message, code: 400 };
  }

  const updated = await IngredientModel.findByIdAndUpdate(id, ingredient, { new: true });

  if (!updated) return { message: 'Invalid id', code: 400 }

  return { ingredient: updated } 
}

const remove = async (id) => {
  const deleted = await IngredientModel.findByIdAndDelete(id);

  if (!deleted) return { message: 'Invalid id', code: 400 }

  return { ingredient: deleted }
}

module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
}

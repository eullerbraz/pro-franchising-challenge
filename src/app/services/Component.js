const Joi = require('joi');

const ComponentModel = require('../models/Component');
const IngredientModel = require('../models/Ingredient');

const validateComponent = (component) => Joi.object({
  ingredient: Joi.object({
    name: Joi.string().not().empty().required(),
    measure: Joi.string().not().empty().required(),
    unitPrice: Joi.number().required(),
  }).required(),
  quantity: Joi.number().integer().required(),
}).validate(component);

const getAll = async () => {
  const components = await ComponentModel.find({});

  return components;
}

const create = async (component) => {
  const { error } = validateComponent(component);

  if (error) {
    const [{ message }] = error.details;
    return { message, code: 400 };
  }

  const created = await ComponentModel.create(component);
  const { ingredient: { name, measure, unitPrice } } = created;

  await IngredientModel
    .findOneAndUpdate(
      { name:component.ingredient.name },
      { name, measure, unitPrice },
      { upsert: true },
    );

  return { component: created }
}

const findById = async (id) => {
  const found = await ComponentModel.findById(id);

  if (!found) return { message: 'Invalid id', code: 400 }

  return { component: found} 
}

const update = async (id, component) => {
  const { error } = validateComponent(component);

  if (error) {
    const [{ message }] = error.details;
    return { message, code: 400 };
  }

  const updated = await ComponentModel.findByIdAndUpdate(id, component, { new: true });

  if (!updated) return { message: 'Invalid id', code: 400 }

  const { ingredient: { name, measure, unitPrice } } = updated;

  await IngredientModel
    .findOneAndUpdate(
      { name:component.ingredient.name },
      { name, measure, unitPrice },
      { upsert: true },
    );

  return { component: updated } 
}

const remove = async (id) => {
  const deleted = await ComponentModel.findByIdAndDelete(id);

  if (!deleted) return { message: 'Invalid id', code: 400 }

  return { component: deleted }
}

module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
}

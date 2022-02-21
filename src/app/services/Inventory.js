const Joi = require('joi');

const InventoryModel = require('../models/Inventory');
const IngredientModel = require('../models/Ingredient');

const validateInventory = (inventory) => Joi.object({
  ingredient: Joi.object({
    name: Joi.string().not().empty().required(),
    measure: Joi.string().not().empty().required(),
    unitPrice: Joi.number().required(),
  }).required(),
  quantity: Joi.number().integer().required(),
}).validate(inventory);

const getAll = async () => {
  const inventorys = await InventoryModel.find({});

  return inventorys;
}

const create = async (inventory) => {
  const { error } = validateInventory(inventory);

  if (error) {
    const [{ message }] = error.details;
    return { message, code: 400 };
  }

  const created = await InventoryModel.create(inventory);
  const { ingredient: { name, measure, unitPrice } } = created;

  await IngredientModel
    .findOneAndUpdate(
      { name:inventory.ingredient.name },
      { name, measure, unitPrice },
      { upsert: true },
    );

  return { inventory: created }
}

const findById = async (id) => {
  const found = await InventoryModel.findById(id);

  if (!found) return { message: 'Invalid id', code: 400 }

  return { inventory: found} 
}

const update = async (id, inventory) => {
  const { error } = validateInventory(inventory);

  if (error) {
    const [{ message }] = error.details;
    return { message, code: 400 };
  }

  const updated = await InventoryModel.findByIdAndUpdate(id, inventory, { new: true });

  if (!updated) return { message: 'Invalid id', code: 400 }

  const { ingredient: { name, measure, unitPrice } } = updated;

  await IngredientModel
    .findOneAndUpdate(
      { name:inventory.ingredient.name },
      { name, measure, unitPrice },
      { upsert: true },
    );

  return { inventory: updated } 
}

const remove = async (id) => {
  const deleted = await InventoryModel.findByIdAndDelete(id);

  if (!deleted) return { message: 'Invalid id', code: 400 }

  return { inventory: deleted }
}

module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
}

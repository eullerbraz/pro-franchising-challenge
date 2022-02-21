const Joi = require('joi');

const ProductModel = require('../models/Product');
const ComponentModel = require('../models/Component');
const IngredientModel = require('../models/Ingredient');

const validateProduct = (product) => Joi.object({
  name: Joi.string().not().empty().required(),
  image: Joi.string().not().empty(),
  price: Joi.number().required(),
  components: Joi.array().items({
    ingredient: Joi.object({
      name: Joi.string().not().empty().required(),
      measure: Joi.string().not().empty().required(),
      unitPrice: Joi.number().required(),
    }).required(),
    quantity: Joi.number().integer().required(),
  }).required(),
}).validate(product);

const getAll = async () => {
  const products = await ProductModel.find({});

  return products;
}

const create = async (product) => {
  const { error } = validateProduct(product);

  if (error) {
    const [{ message }] = error.details;
    return { message, code: 400 };
  }

  const created = await ProductModel.create(product);

  const { components } = created;

  await Promise.all(
    components
    .map(async ({ ingredient, quantity }) => {
      await ComponentModel.findOneAndUpdate(
        { ingredient, quantity },
        { ingredient, quantity },
        { upsert: true },
      );

      await IngredientModel
      .findOneAndUpdate(
        { name: ingredient.name },
        { name: ingredient.name, measure: ingredient.measure, unitPrice: ingredient.unitPrice },
        { upsert: true },
      );
    })
  );

  return { product: created }
}

const findById = async (id) => {
  const found = await ProductModel.findById(id);

  if (!found) return { message: 'Invalid id', code: 400 }

  return { product: found} 
}

const update = async (id, product) => {
  const { error } = validateProduct(product);

  if (error) {
    const [{ message }] = error.details;
    return { message, code: 400 };
  }

  const updated = await ProductModel.findByIdAndUpdate(id, product, { new: true });

  if (!updated) return { message: 'Invalid id', code: 400 };


  const { components } = updated;

  await Promise.all(
    components
    .map(async ({ ingredient, quantity }) => {
      await ComponentModel.findOneAndUpdate(
        { ingredient, quantity },
        { ingredient, quantity },
        { upsert: true },
      );

      await IngredientModel
      .findOneAndUpdate(
        { name: ingredient.name },
        { name: ingredient.name, measure: ingredient.measure, unitPrice: ingredient.unitPrice },
        { upsert: true },
      );
    })
  );

  return { product: updated } 
}

const remove = async (id) => {
  const deleted = await ProductModel.findByIdAndDelete(id);

  if (!deleted) return { message: 'Invalid id', code: 400 }

  return { component: deleted }
}

const addImage = async (id, imageName) => {
  const image = `localhost:3000/src/uploads/${imageName}`;

  const updated = await ProductModel.findByIdAndUpdate(id, { image }, { new: true });

  if (!updated) return { message: 'Invalid id', code: 400 };

  return { product: updated } 
}

module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
  addImage,
}

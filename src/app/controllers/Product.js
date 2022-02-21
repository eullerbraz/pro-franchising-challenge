const ProductService = require('../services/Product');

const getAll = async (_req, res) => {
  const products = await ProductService.getAll();

  return res.status(200).json(products);
}

const create = async (req, res, next) => {
  const {code, message, product} = await ProductService.create(req.body);

  if (message) return next({ message, code });

  return res.status(201).json(product);
}

const findById = async (req, res, next) => {
  const { id } = req.params;
  const {code, message, product} = await ProductService.findById(id);

  if (message) return next({ message, code });

  return res.status(200).json(product);
}

const update = async (req, res, next) => {
  const { id } = req.params;
  const {code, message, product} = await ProductService.update(id, req.body);

  if (message) return next({ message, code });

  return res.status(200).json(product);
}

const remove = async (req, res, next) => {
  const { id } = req.params;
  const { product, message, code } = await ProductService.remove(id);

  if (message) return next({ message, code });

  return res.status(200).json(product);
}


const addImage = async (req, res, next) => {
  const { filename } = req.file;
  const { id } = req.params;

  const { code, message, product } = await ProductService
    .addImage(id, filename);

  if (message) return next({ message, code });

  return res.status(200).json(product);
}

const verifyCanBeSell = async (req, res, next) => {
  const { id } = req.params;
  const {code, message, response} = await ProductService.verifyCanBeSell(id);

  if (message) return next({ message, code });

  return res.status(200).json({ response });
}

module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
  addImage,
  verifyCanBeSell,
}

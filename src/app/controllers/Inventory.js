const InventoryService = require('../services/Inventory');

const getAll = async (_req, res) => {
  const invetories = await InventoryService.getAll();

  return res.status(200).json(invetories);
}

const create = async (req, res, next) => {
  const {code, message, invetory} = await InventoryService.create(req.body);

  if (message) return next({ message, code });

  return res.status(201).json(invetory);
}

const findById = async (req, res, next) => {
  const { id } = req.params;
  const {code, message, invetory} = await InventoryService.findById(id, req.body);

  if (message) return next({ message, code });

  return res.status(200).json(invetory);
}

const update = async (req, res, next) => {
  const { id } = req.params;
  const {code, message, invetory} = await InventoryService.update(id, req.body);

  if (message) return next({ message, code });

  return res.status(200).json(invetory);
}

const remove = async (req, res, next) => {
  const { id } = req.params;
  const { invetory, message, code } = await InventoryService.remove(id);

  if (message) return next({ message, code });

  return res.status(200).json(invetory);
}

module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
}

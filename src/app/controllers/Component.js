const ComponentService = require('../services/Component');

const getAll = async (_req, res) => {
  const components = await ComponentService.getAll();

  return res.status(200).json(components);
}

const create = async (req, res, next) => {
  const {code, message, component} = await ComponentService.create(req.body);

  if (message) return next({ message, code });

  return res.status(201).json(component);
}

const findById = async (req, res, next) => {
  const { id } = req.params;
  const {code, message, component} = await ComponentService.findById(id, req.body);

  if (message) return next({ message, code });

  return res.status(200).json(component);
}

const update = async (req, res, next) => {
  const { id } = req.params;
  const {code, message, component} = await ComponentService.update(id, req.body);

  if (message) return next({ message, code });

  return res.status(200).json(component);
}

const remove = async (req, res, next) => {
  const { id } = req.params;
  const { component, message, code } = await ComponentService.remove(id);

  if (message) return next({ message, code });

  return res.status(200).json(component);
}

module.exports = {
  getAll,
  create,
  findById,
  update,
  remove,
}

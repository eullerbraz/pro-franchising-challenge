module.exports = (err, _req, res, _next) => {
  const { message, code } = err;

  if (typeof code === 'number') {
    return res.status(code).json({ message });
  }

  return res.status(500).json({ message });
};
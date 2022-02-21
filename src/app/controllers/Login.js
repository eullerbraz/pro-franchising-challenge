const Login = require('../services/Login');

module.exports = async (req, res, next) => {
  const { email, password } = req.body;

  const { token, code, message } = await Login({ email, password });

  if (message) {
    return next({ message, code });
  }

  return res.status(code).json({ token });
};
const { verifyUser } = require('../services/Auth');

module.exports = (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next({ message: 'missing auth token', code: 401 });
  }

  const user = verifyUser(authorization);

  if (!user) {
    return next({ message: 'jwt malformed', code: 401 });
  }

  if (user.email !== 'owner@email.com') {
    return next({ message: 'Only owner can use this', code: 401 });
  }

  req.user = user;

  next();
};
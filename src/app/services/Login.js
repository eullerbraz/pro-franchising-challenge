const { signUser } = require('./Auth');

const login = async (user) => {
  const { email, password } = user;

  if (!email || !password) {
    return { message: 'All fields must be filled', code: 401 };
  }

  const token = signUser(user);

  return { token, code: 200 };
};

module.exports = login;
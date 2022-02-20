const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const {
  PORT = 3000,
  DB_URL = 'mongodb://localhost:27017/pro-franchising-challenge',
} = process.env;

const app = require('./app');

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

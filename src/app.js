const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(json());

app.get('/', (req, res) => {
  return res.status(200).json({ respone: 'ok' })
});

module.exports = app;

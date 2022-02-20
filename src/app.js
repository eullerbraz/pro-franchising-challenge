const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');

const IngredientRouter = require('./app/routers/Ingredient');

const app = express();

app.use(cors());

app.use(json());

app.use('/ingredient', IngredientRouter)

module.exports = app;

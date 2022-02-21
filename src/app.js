const express = require('express');
const { json } = require('body-parser');
const cors = require('cors');

const IngredientRouter = require('./app/routers/Ingredient');
const ComponentRouter = require('./app/routers/Component');
const error = require('./app/middlewares/error');

const app = express();

app.use(cors());

app.use(json());

app.use('/ingredient', IngredientRouter);
app.use('/component', ComponentRouter);

app.use(error);

module.exports = app;

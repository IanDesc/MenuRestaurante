const express = require('express');


const app = express();
app.use(express.json());
app.use(require('../src/helpers/ConnectMongo'));

const userRouter = require('./Control/userRouter');
app.use("/", userRouter);

const drinkRouter = require('./Control/drinkRouter');
app.use("/", drinkRouter);

const burguerRouter = require('./Control/burguerRouter');
app.use("/", burguerRouter);

module.exports = app;
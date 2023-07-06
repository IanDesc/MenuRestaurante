const express = require('express');


const app = express();
app.use(express.json());
app.use(require('../src/helpers/ConnectMongo'));

const userRouter = require('./Control/userRouter');
app.use("/user", userRouter);

const drinkRouter = require('./Control/drinkRouter');
app.use("/drink", drinkRouter);

const burguerRouter = require('./Control/burguerRouter');
app.use("/burguer", burguerRouter);

module.exports = app;
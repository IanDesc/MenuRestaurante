const express = require('express');
const app = express();

app.use(express.json());
app.use(require('../src/helpers/ConnectMongo'));

const InsertRouter = require('./Control/InsertDataRouter');
app.use("/insert", InsertRouter);

const userRouter = require('./Control/userRouter');
app.use("/user", userRouter);

const drinkRoute = require('./Control/drinkRouter');
app.use("/drink", drinkRoute);

const burguerRouter = require('./Control/burguerRouter');
app.use("/burguer", burguerRouter);

module.exports = app;
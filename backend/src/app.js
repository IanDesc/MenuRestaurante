const express = require('express');
const router = require('./Control/router');

const app = express();
app.use(require('../src/helpers/ConnectMongo'));
app.use(express.json());
app.use("/", router);

module.exports = app;
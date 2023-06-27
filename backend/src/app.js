const express = require('express');
const router = require('./Control/router');

const app = express();
app.use(router);

// app.get('/', (payload, response) => response.status(200).send('Olá Mundo!'));

module.exports = app;
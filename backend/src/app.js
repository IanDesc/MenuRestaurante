const express = require('express');
const router = require('./Control/router');

// await connectDB();

const app = express();
app.use(require('../src/helpers/ConnectMongo'));
app.use("/burguers", router);



// app.get('/', (payload, response) => response.status(200).send('Olá Mundo!'));

module.exports = app;
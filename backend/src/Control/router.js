const express = require('express');
const router = express.Router();
const burguer = require('../models/burger');

function success (obj) {
    let resp = {status: true};
    return resp.obj = obj;
};
function fail (message) {
    return {status: false, message: message};
};

router.get('/', (req, res) => {
    burguer.listBurguer().then((burguerList) => {
        res.json(success(burguerList));
    })
    // res.status(200).send(burguer.listBurguer());
});

// router.get('/', (req, res) => {
//     res.status(200).send('o router esta funcionando!');
// });

module.exports = router;
const express = require('express');
const router = express.Router();
const burguer = require('../models/burger');
const user = require('../models/user');

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

router.post('/auth/login', (req, res) => {
    const {email, password} = req.body;

    //validação
    if (!email || !password){
        res.status(422).json(fail("Todos os campos são obrigatórios"));
    };

    user.insertUser(email, password).then(user => {
        res.json(success(user));
    }).catch(err => {
        console.log(err);
        res.status(500).json(fail("Falha ao realizar o login"));
    });
});

// router.get('/', (req, res) => {
//     res.status(200).send('o router esta funcionando!');
// });

module.exports = router;
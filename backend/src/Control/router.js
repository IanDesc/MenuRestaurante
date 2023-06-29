const express = require('express');
const router = express.Router();
const burguer = require('../models/burger');
const user = require('../models/user');
const jwt = require('jsonwebtoken');

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

router.post('/auth/register', (req, res) => {
    const {email, password} = req.body;

    //validação
    if (!email || !password){
        res.status(422).json(fail("Todos os campos são obrigatórios"));
    };

    const userExists = user.userModel.findOne({email: email});
    if (!userExists) {
        res.status(422).json(fail("Esse email já foi utilizado!"));
    } else {
        user.insertUser(email, password).then(user => {
            res.json(success(user));
        }).catch(err => {
            console.log(err);
            res.status(500).json(fail("Falha ao realizar o registro"));
        });
    };

});

router.post('/auth/login', (req, res) => {
    const {email, password} = req.body;

    //validação
    if (!email || !password){
        res.status(422).json(fail("Todos os campos são obrigatórios"));
    };

    const userExists = user.userModel.findOne({email: email, password: password});
    console.log(userExists);
    if (!userExists) {
        res.status(422).json(fail("Email ou senha inválida!"));
    } else {

        const secret = process.env.SECRET;
        const token = jwt.sign({id: userExists._id}, secret);
        res.json(success(token));
    };
});

// router.post('/auth/register', (req, res) => {
//     const {email, password} = req.body;

//     //validação
//     if (!email || !password){
//         res.status(422).json(fail("Todos os campos são obrigatórios"));
//     };

//     user.insertUser(email, password).then(user => {
//         res.json(success(user));
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json(fail("Falha ao realizar o login"));
//     });
// });


// router.get('/', (req, res) => {
//     res.status(200).send('o router esta funcionando!');
// });

module.exports = router;
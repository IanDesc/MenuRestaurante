const express = require('express');
const router = express.Router();
const User = require('../models/user');
require("dotenv").config();
const jwt = require('jsonwebtoken');

function success (obj) {
    let resp = {status: true};
    return resp.obj = obj;
};
function fail (message) {
    return {status: false, message: message};
};

//PUBLIC ROUTES

//User
router.post('/register', async (req, res) => {
    const {email, password, adm} = req.body;

    //validação
    if (!email || !password){
        return res.status(422).json(fail("Todos os campos são obrigatórios"));
    };

    const userExists = User.findUserByEmail(email);
    if (!userExists) {
        return res.status(422).json(fail("Esse email já foi utilizado!"));
    } else {
        User.insertUser(email, password, adm).then(user => {
            res.json(success(user));
        }).catch(err => {
            console.log(err);
            res.status(500).json(fail("Falha ao realizar o registro"));
        });
    };

});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;

    //validação
    if (!email || !password){
        return res.status(422).json(fail("Todos os campos são obrigatórios"));
    };

    const userExists = User.findUserByLogin(email, password);
    console.log(userExists);
    if (!userExists) {
        return res.status(422).json(fail("Email ou senha inválida!"));
    } else {

        const secret = process.env.SECRET;
        const token = jwt.sign({id: userExists._id}, secret, { expiresIn: "12h" });
        res.json(success(token));
    };
});

//PRIVATE ROUTES

function verifyToken (req, res, next) {
    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json(fail("Usuario não autorizado!"));
    };

    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
};

router.get("/:id", verifyToken, async (req, res) => {
    const id = req.params.id;
    const userExists = User.findUserById(id);
    if (!userExists) {
        return res.status(404).json(fail("User não encontrado!"));
    };
    res.status(404).json({userExists});
});


module.exports = router;
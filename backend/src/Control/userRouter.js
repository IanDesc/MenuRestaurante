const express = require('express');
const router = express.Router();
const Burguer = require('../models/burger');
const User = require('../models/user');
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
router.post('/auth/register', (req, res) => {
    const {email, password, adm} = req.body;

    //validação
    if (!email || !password){
        return res.status(422).json(fail("Todos os campos são obrigatórios"));
    };

    const userExists = User.userModel.findOne({email: email});
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

router.post('/auth/login', (req, res) => {
    const {email, password} = req.body;

    //validação
    if (!email || !password){
        return res.status(422).json(fail("Todos os campos são obrigatórios"));
    };

    const userExists = User.userModel.findOne({email: email, password: password});
    console.log(userExists);
    if (!userExists) {
        return res.status(422).json(fail("Email ou senha inválida!"));
    } else {

        const secret = process.env.SECRET;
        const token = jwt.sign({id: userExists._id}, secret);
        res.json(success(token));
    };
});

//PRIVATE ROUTES

function verifyToken (req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(401).json(fail("Usuario não autorizado!"));
    };

    const secret = process.env.SECRET;
    jwt.verify(token, secret);
    next();
}

router.get("/user/:id", verifyToken, (req, res) => {
    const id = req.params.id;
    const user = User.userModel.findById(id, "-password");
    if (!user) {
        return res.status(404).json(fail("User não encontrado!"));
    };
    res.status(404).json({user});
});


module.exports = userRouter;
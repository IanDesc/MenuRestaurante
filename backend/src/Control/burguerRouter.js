const express = require('express');
const router = express.Router();
const Burguer = require('../models/burger');
const jwt = require('jsonwebtoken');

function success (obj) {
    let resp = {status: true};
    return resp.obj = obj;
};
function fail (message) {
    return {status: false, message: message};
};

//PUBLIC ROUTES

router.get('/', (req, res) => {
    Burguer.listBurguer().then((burguerList) => {
        res.json(success(burguerList));
    })
    // res.status(200).send(Burguer.listBurguer());
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

router.post('/', (req, res) => {
    const {name, description, weight, vegan, price} = req.body;

    //validação
    if (!name || !price){
        return res.status(422).json(fail("Todo lanche deve ter pelo menos nome e preço!"));
    };

    Burguer.insertBurguer(name, description, weight, vegan, price).then(burguer => {
        res.json(success(burguer));
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Erro! Não foi possivel salvar o novo lanche!"))
    });
});

router.put("/:id", (req, res) => {
    const {id} = req.params
    const {name, description, weight, vegan, price} = req.body;

    let obj = {};
    if (name) obj.name = name;
    if (description) obj.description = description;
    if (weight) obj.weight = weight;
    if (vegan) obj.vegan = vegan;
    if (price) obj.price = price;

    if (obj == {}) {
        return res.status(500).json(fail("Nenhuma alteração foi feita!"));
    };

    Burguer.insertBurguer(id, obj).then(burguer => {
        if (burguer)
            res.json(success(burguer))
        else
            res.status(500).json(fail("Id de lanche não encontrado!"));
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha no banco!"))
    });
});

router.delete("/:id", (req, res) => {
    const {id} = req.params;

    Burguer.deleteBurguer(id).then(burguer => {
        if (burguer)
            res.json(success(burguer))
        else
            res.status(500).json(fail("Id de lanche não encontrado!"));
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha no banco!"))
    });
});

module.exports = router;
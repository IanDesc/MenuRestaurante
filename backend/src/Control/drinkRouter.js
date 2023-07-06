const express = require('express');
const router = express.Router();
const Drink = require('../models/drink');
const jwt = require('jsonwebtoken');

function success (obj) {
    let resp = {status: true};
    return resp.obj = obj;
};
function fail (message) {
    return {status: false, message: message};
};

//PUBLIC ROUTES
//drinks
router.get('/:limit/:page', (req, res) => {
    const {limit, page} = req.params;
    const skip = (limit * page) - limit;
    Drink.listDrink(skip, limit).then((drinkList) => {
        return res.json(success(drinkList));
    })
});

//PRIVATE ROUTES
router.post('/', (req, res) => {
    const {name, milliliters, alcoholic, price} = req.body;

    //validação
    if (!name || !milliliters || !price){
        return res.status(422).json(fail("Todo bebida deve possuir nome, mililitros e preço!"));
    };
    if (!alcoholic) {
        alcoholic = true;
    };
    Drink.insertDrink(name, milliliters, alcoholic, price).then(drink => {
        res.json(success(drink));
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Erro! Não foi possivel salvar a nova bebida!"))
    });
});

router.put("/:id", (req, res) => {
    const {id} = req.params
    const {name, milliliters, alcoholic, price} = req.body;

    let obj = {};
    if (name) obj.name = name;
    if (milliliters) obj.milliliters = milliliters;
    if (alcoholic) obj.alcoholic = alcoholic;
    if (price) obj.price = price;

    if (obj == {}) {
        return res.status(500).json(fail("Nenhuma alteração foi feita!"));
    };

    Drink.insertDrink(id, obj).then(drink => {
        if (drink)
            res.json(success(drink))
        else
            res.status(500).json(fail("Id de bebida não encontrado!"));
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha no banco!"))
    });
});

router.delete("/:id", (req, res) => {
    const {id} = req.params;

    Drink.deleteDrink(id).then(drink => {
        if (drink)
            res.json(success(drink))
        else
            res.status(500).json(fail("Id de bebida não encontrado!"));
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha no banco!"))
    });
});


module.exports = router;
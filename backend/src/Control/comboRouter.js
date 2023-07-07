const express = require('express');
const router = express.Router();
const Combo = require('../models/combo');
const Burguer = require('../models/burger');
const Drink = require('../models/drink');
const { verifyToken } = require("../Middlewares/token");

function success (obj) {
    let resp = {status: true};
    return resp.obj = obj;
};
function fail (message) {
    return {status: false, message: message};
};

//PUBLIC ROUTES

router.get('/:limit/:page', (req, res) => {
    const {limit, page} = req.params;
    const skip = (limit * page) - limit;
    Combo.listCombo(skip, limit).then((comboList) => {
        res.json(success(comboList));
    })
    .catch(err => {
        res.json(failure(err));
    });
});

//PRIVATE ROUTES

router.post('/', verifyToken, (req, res) => {
    const {burguerId, drinkId, comboName, price} = req.body;

    //validação
    if (!burguerId || !drinkId || !drinkId || !price ){
        return res.status(422).json(fail("Restam dados!"));
    };

    const burguer = Burguer.findBurguerById(burguerId);
    const drink = Drink.findDrinkById(drinkId);

    if (!burguer || !drink ){
        return res.status(422).json(fail("Verifique os ID's e tente novamente!"));
    };
    

    Combo.insertCombo(burguerId, drinkId, comboName, burguer.name, drink.name, price).then(combo => {
        res.json(success(combo));
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Erro! Não foi possivel salvar o novo combo!"))
    });
});

router.delete("/:id", verifyToken, (req, res) => {
    const {id} = req.params;

    Combo.deleteCombo(id).then(combo => {
        if (combo)
            res.json(success(combo))
        else
            res.status(500).json(fail("Id de combo não encontrado!"));
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha no banco!"))
    });
});

module.exports = router;
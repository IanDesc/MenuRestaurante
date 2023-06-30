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

//burguers
router.get('/', (req, res) => {
    Burguer.listBurguer().then((burguerList) => {
        res.json(success(burguerList));
    })
    // res.status(200).send(Burguer.listBurguer());
});

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

router.post('/burguer', (req, res) => {
    const {name, description, weight, vegan, price} = req.body;

    //validação
    if (!name || !price){
        return res.status(422).json(fail("Todo lanche deve ter pelo menos nome e preço!"));
    };

    Burguer.insertBurguer(name, description, weight, vegan, price).then(burguer => {
        res.json(sucess(burguer));
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Erro! Não foi possivel salvar o novo livro!"))
    });
});

router.put("/burguer/:id", (req, res) => {
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
            res.json(sucess(burguer))
        else
            res.status(500).json(fail("Id de lanche não encontrado!"));
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha no banco!"))
    });
});

router.delete("/burguer/:id", (req, res) => {
    const {id} = req.params;

    Burguer.deleteBurguer(id).then(burguer => {
        if (burguer)
            res.json(sucess(burguer))
        else
            res.status(500).json(fail("Id de lanche não encontrado!"));
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha no banco!"))
    });
});

router.post('/combo', (req, res) => {
    const {name1, name2, description, weight, vegan, price} = req.body;

    //validação
    if (!name1 || !name2 || !price){
        return res.status(422).json(fail("Todo combo deve ter pelo menos nomes e preço!"));
    };

    Burguer.insertCombo(name1, name2, description, weight, vegan, price).then(combo => {
        res.json(sucess(combo));
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Erro! Não foi possivel salvar o novo livro!"))
    })
});


module.exports = router;
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { verifyToken, verifyAdmin } = require("../Middlewares/token");
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
router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    

    //validação
    if (!email || !password){
        return res.status(422).json(fail("Todos os campos são obrigatórios"));
    };
    // console.log(User);
    

    const userExists = await User.findUserByLogin(email, password);
    

    if (!userExists) {
        return res.status(422).json(fail("Email ou senha inválida!"));
    } else {
        const secret = process.env.SECRET;
        const token = jwt.sign({id: userExists._id}, secret, { expiresIn: "12h" });
        res.json(success(token));
    };
});

//PRIVATE ROUTES

router.get("/:email", verifyToken, async (req, res) => {
    const email = req.params.email;
    const userExists = await User.findUserByEmail(email);
    if (!userExists) {
        return res.status(404).json(fail("User não encontrado!"));
    };
    return res.status(404).json({userExists});
});

router.post('/register', verifyToken, async (req, res) => {
    const {name, role, email, password, adm} = req.body;

    //validação
    if (!email || !password || !name){
        return res.status(422).json(fail("Todos os campos são obrigatórios"));
    };

    const userExists = await User.findUserByEmail(email);
    if (!userExists) {
        return res.status(422).json(fail("Esse email já foi utilizado!"));
    } else {
        User.insertUser(name, role, email, password, adm).then(user => {
            res.json(success(user));
        }).catch(err => {
            console.log(err);
            res.status(500).json(fail("Falha ao realizar o registro"));
        });
    };

});

router.put("/updateSelf/:id", verifyToken, (req, res) => {
    const {id} = req.params
    const {name, role} = req.body;
    // console.log(req.body);

    let obj = {};
    if (name) obj.name = name;
    if (role) obj.role = role;

    if (obj == {}) {
        return res.status(500).json(fail("Nenhuma alteração foi feita!"));
    };

    User.updateUser(id, obj).then(user => {
        if (user)
            res.json(success(user))
        else
            res.status(500).json(fail("Id de usuario não encontrado!"));
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha no banco!"))
    });
});

router.put("/updateOthers/:idAdm/:idUser", verifyAdmin, verifyToken, async (req, res) => {
    const {idAdm, idUser} = req.params;
    const {name, role, email, password, adm} = req.body;
    // console.log(req.body);

    let obj = {};
    if (name) obj.name = name;
    if (role) obj.role = role;
    if (email) obj.email = email;
    if (password) obj.password = password;
    if (adm) obj.adm = adm;

    if (obj == {}) {
        return res.status(500).json(fail("Nenhuma alteração foi feita!"));
    };

    User.updateUser(idUser, obj).then(user => {
        if (user)
            res.json(success(user))
        else
            res.status(500).json(fail("Id de usuario não encontrado!"));
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha no banco!"))
    });
});

router.delete("/delete/:id", verifyToken, (req, res) => {
    const {id} = req.params;

    User.deleteUser(id).then(user => {
        if (user)
            res.json(success(user))
        else
            res.status(500).json(fail("Id de usuario não existe!"));
    }).catch(err => {
        console.log(err)
        res.status(500).json(fail("Falha no banco!"))
    });
});


module.exports = router;
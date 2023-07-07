const User = require('../models/user');
const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken (req, res, next) {
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json(fail("Usuario não autorizado!"));
    };
    const secret = process.env.SECRET;
    const decoded = jwt.verify(token, secret);
    req.params.id = decoded._id;
    next();
};

async function verifyAdmin (req, res, next) {
    const {id} = req.params.id
    const userExists = await User.findUserById(id);
    if (!userExists.adm) {
        return res.status(422).json(fail("Você precisa ser administrador para realizar essa ação!"));
    };
    next();
};

module.exports = {
    verifyToken,
    verifyAdmin,
};
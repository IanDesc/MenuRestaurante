const mongoose = require("mongoose");

module.exports = (req, res, next) => {
    mongoose.connect("mongodb://localhost:27017/Menu")
    .then(res => {
        console.log("Conectado com MongoDB com sucesso");
        // console.log("Sucesso: ", res);
    })
    .catch((err) => {
        console.log("Error ao conectar no banco...");
        // console.log("Error: ", err);
    })
    return next()    
};


const mongoose = require("mongoose")

module.exports = (req, res, next) => {
    mongoose.connect("mongodb://127.0.0.1:27017/Menu").catch((err) => {
        console.log("Error ao conectar no banco...")
    })
    return next()    
}

// const mongoose = require("mongoose");

// module.exports = async (req, res, next) => {

//     try {
//         await mongoose.createConnection()('mongodb://localhost:27017/Menu')
//       } catch (error) {
//         handleError(error);
//       }


// };

    // await mongoose.connect("mongodb://localhost:27017/Menu")
    // .then(res => {
    //     console.log("Conectado com MongoDB com sucesso");
    //     // console.log("Sucesso: ", res);
    // })
    // .catch((err) => {
    //     console.log("Error ao conectar no banco...");
    //     // console.log("Error: ", err);
    // })
const mongoose = require("mongoose");

const burguerSchema = new mongoose.Schema({
    name: String,
    description: String,
    weight: Number,
    vegan: Boolean,
    price: Number
});


const burguerModel = mongoose.model("Burguer", burguerSchema);

module.exports = {

    listBurguer: async function() {
        const burguerList = await burguerModel.find().lean();
        return burguerList;
    },
    
    insertBurguer: async function(name, description, weight, vegan, price) {
        const burguer = new burguerModel({
            name: name,
            description: description,
            weight: weight,
            vegan: vegan,
            price: price
        });
        await burguer.save();
        return burguer;
    },

    updateBurguer: async function(id, obj) {
        let burguer = await burguerModel.findById(id);
        if (!burguer) {
            return false;
        }
        
        Object.keys(obj).forEach(key => burguer[key] = obj[key]);
        await burguer.save();
        return burguer;
    },

    deleteBurguer: async function(id) {
        return await burguerModel.findByIdAndDelete(id);
    },
    // getById: async function(id) {
    //     return await burguerModel.findById(id).lean();
    // }
}
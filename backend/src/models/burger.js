const mongoose = require("mongoose");

const burguerSchema = new mongoose.Schema({
    name: String,
    description: String,
    weight: Number,
    vegan: Boolean,
    price: Number
});

const comboSchema = new mongoose.Schema({
    name1: String,
    name2: String,
    description: String,
    weight: Number,
    vegan: Boolean,
    price: Number
});

const burguerModel = mongoose.model("Burguer", burguerSchema);
const ComboModel = mongoose.model("Combo", comboSchema);

module.exports = {
    burguerModel,
    ComboModel,

    listBurguer: async function() {
        const burguerList = await burguerModel.find({Campo: 1}).limit(3).lean();
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

    insertCombo: async function(obj) {
        const combo = new ComboModel({
            name1: name1,
            name2: name1,
            description: description,
            weight: weight,
            vegan: vegan,
            price: price
        });
        await combo.save();
        return combo;
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
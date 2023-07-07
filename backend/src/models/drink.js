const mongoose = require("mongoose");

const drinkSchema = new mongoose.Schema({
    name: String,
    milliliters: Number,
    alcoholic: Boolean,
    price: Number
});

const drinkModel = mongoose.model("Drink", drinkSchema);

module.exports = {

    listDrink: async function(skip, limit) {
        const drinkList = await drinkModel.find().skip(skip).limit(limit).lean();
        return drinkList;
    },
    
    insertDrink: async function(name, milliliters, alcoholic, price) {
        const drink = new drinkModel({
            name: name,
            milliliters: milliliters,
            alcoholic: alcoholic,
            price: price
        });
        await drink.save();
        return drink;
    },

    updateDrink: async function(id, obj) {
        let drink = await drinkModel.findById(id);
        if (!drink) {
            return false;
        };    
        Object.keys(obj).forEach(key => drink[key] = obj[key]);
        await drink.save();
        return drink;
    },

    deleteDrink: async function(id) {
        return await drinkModel.findByIdAndDelete(id);
    },

    findDrinkById: async function(id) {
        const drinkFinded = await drinkModel.findById(id);
        return drinkFinded;
    },
}
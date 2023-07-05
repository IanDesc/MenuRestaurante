const mongoose = require("mongoose");

const drinkSchema = new mongoose.Schema({
    name: String,
    milliliters: Number,
    alcoholic: Boolean,
    price: Number
});

const drinkModel = mongoose.model("Drinks", drinkSchema);

module.export = {
    drinkModel,

    listDrink: async function() {
        const drinkList = await drinkModel.find({}).lean();
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
        }
        
        Object.keys(obj).forEach(key => drink[key] = obj[key]);
        await drink.save();
        return drink;
    },

    deleteDrink: async function(id) {
        return await drinkModel.findByIdAndDelete(id);
    },
}
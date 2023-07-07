const mongoose = require("mongoose");

const comboSchema = new mongoose.Schema({
    burguerId: String,
    drinkId: String,
    comboName: String,
    burguerName: String,
    drinkName: String,
    price: Number,
});

const comboModel = mongoose.model("Combo", comboSchema);

module.exports = {

    listCombo: async function(skip, limit) {
        const comboList = await comboModel.find().skip(skip).limit(limit).lean();
        return comboList;
    },
    
    insertCombo: async function(burguerId, drinkId, comboName, burguerName, drinkName, price) {
        
        const combo = new comboModel({
            burguerId: burguerId,
            drinkId: drinkId,
            comboName: comboName,
            burguerName: burguerName,
            drinkName: drinkName,
            price: price
        });
        await combo.save();
        return combo;
    },

    updateCombo: async function(id, obj) {
        let combo = await comboModel.findById(id);
        if (!combo) {
            return false;
        }
        
        Object.keys(obj).forEach(key => combo[key] = obj[key]);
        await combo.save();
        return combo;
    },

    deleteCombo: async function(id) {
        return await comboModel.findByIdAndDelete(id);
    },
}
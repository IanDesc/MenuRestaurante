const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    adm: Boolean,
});

const userModel = mongoose.model("User", userSchema);

module.exports = {
    // listUser: async function() {
    //     const userList = await userModel.find({}).lean();
    //     return userList;
    // },
    userModel,
    
    insertUser: async function(email, password, adm) {
        const user = new userModel({
            email: email,
            password: password,
            adm: adm
        });
        await user.save();
        return user;
    },

    updateUserSelf: async function(id, obj) {
        let user = await userModel.findById(id);
        if (!user) {
            return false;
        }
        
        Object.keys(obj).forEach(key => user[key] = obj[key]);
        await user.save();
        return user;
    },

    deleteUser: async function(id) {
        return await userModel.findByIdAndDelete(id);
    },
    // getById: async function(id) {
    //     return await userModel.findById(id).lean();
    // }
}
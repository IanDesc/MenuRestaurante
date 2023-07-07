const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    role: String,
    email: String,
    password: String,
    adm: Boolean,
});

const userModel = mongoose.model("User", userSchema);

module.exports = {
    
    insertUser: async function(name, role, email, password, adm) {
        const user = new userModel({
            name: name,
            role: role,
            email: email,
            password: password,
            adm: adm
        });
        await user.save();
        return user;
    },

    findUserByEmail: async function(email) {
        const userExists = await userModel.findOne({email: email});
        return userExists;
    },

    findUserByLogin: async function(email, password) {
        const userExists = await userModel.findOne({email: email, password: password});
        return userExists;
    },

    findUserById: async function(id) {
        const userExists = await userModel.findOne({_id: id});
        return userExists;
    },

    updateUser: async function(id, obj) {
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
}
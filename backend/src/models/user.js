const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
});

const userModel = mongoose.model("User", userSchema);

module.exports = {
    // listUser: async function() {
    //     const userList = await userModel.find({}).lean();
    //     return userList;
    // },
    
    insertUser: async function(email, password) {
        const user = new userModel({
            email: email,
            password: password,
        });

        await user.save();
        return user;
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
    // getById: async function(id) {
    //     return await userModel.findById(id).lean();
    // }
}
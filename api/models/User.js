const mongoose = require("mongoose")
const {Schema} = mongoose

const UserSchema = new Schema({
    name: String,
    pfp:[String],
    email:{ type:String, unique:true},
    password:String
    ,saved:[String]
})

const UserModel = mongoose.model("User", UserSchema)

module.exports = UserModel
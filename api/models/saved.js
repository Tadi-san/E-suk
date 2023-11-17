const mongoose = require("mongoose")
const {Schema} = mongoose
const SavedSchema = new Schema({

    owner:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
    Saveditem:String
})

const savedModel = mongoose.model("Saved", SavedSchema)
module.exports = savedModel
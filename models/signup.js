const mongoose = require("mongoose")

// const productsSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     price: { type: String, required: true },
//     category: { type: String, required: true },
//     description: { type: String },
//     weight: { type: String },
//     units: { type: Number },
// imageBase64: {type:String},
// },{timestamps:true})

    const signupDetails = new mongoose.Schema({
        firstName: { type: String, required: true },
        lastName: { type: String },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        products:[{type:mongoose.Schema.Types.ObjectId, ref:"products", require:true}]
    },{timestamps:true}) 

module.exports = mongoose.model("accounts", signupDetails)
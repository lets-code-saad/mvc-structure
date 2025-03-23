const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String },
    weight: { type: String },
    units: { type: Number },
    imageBase64: { type: String },
user:{type: mongoose.Schema.Types.ObjectId, require:true, ref:"accounts" }
}, { timestamps: true })

module.exports = mongoose.model("products", productSchema)
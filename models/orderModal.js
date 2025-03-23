const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    order: { type: mongoose.Schema.Types.ObjectId, require: true, ref: "accounts" },
    orderItems: [
        {
            products: { type: mongoose.Schema.Types.ObjectId, ref: "products", require: true }
        },
        {
            name: String,
            quantity: { type: Number, require:true },
            price: { type: Number, require:true },
        }
    ],
    paymentMethod: { type: String, require: true },
    shippingAddress: { address: { type: String, require: true } },
    totalPrice: { type: String, require: true }
})

module.exports = mongoose.model("order", orderSchema)
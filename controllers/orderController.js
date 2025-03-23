const orderModal = require("../models/orderModal")

const placeOrder = async (req, res) => {
    try {
        //we can also set default value if the user didn't send anything eg, paymentMethod="COD"
        const { orderItems, paymentMethod, shippingAddress, totalPrice } = req.body

        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: "Order Items Are Required" })
        }
        // if all the details are filled
        const order = new orderModal({
            userId: req.user.userId,
            orderItems,
            paymentMethod,
            shippingAddress,
            totalPrice
        })
// saving the user
        await order.save()

res.status(201).json({message:"Order Completed"})

    }
    catch (err) {
        return res.status(404).json({ message: "Internal Server Error" })
    }
}

module.exports = placeOrder
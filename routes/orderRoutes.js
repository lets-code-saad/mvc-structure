const express = require("express")
const authenticateToken = require("../middleware/authMiddleWare")
const placeOrder = require("../controllers/orderController")
const router = express.Router()

router.post("/orderRoute", authenticateToken, placeOrder)

module.exports = router
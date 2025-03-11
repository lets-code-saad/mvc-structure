const express = require("express")
const authenticateToken = require("../middleware/authMiddleWare")
const { addProduct } = require("../controllers/userController")
const router = express.Router()

router.post("/addProducts", authenticateToken, addProduct)


module.exports = router
const express = require("express")
const authenticateToken = require("../middleware/authMiddleWare")
const { addProduct, getProducts, editProducts, deleteProducts } = require("../controllers/userController")
const upload = require("../middleware/upload")
const router = express.Router()

router.post("/addProducts", authenticateToken,upload.single("image"), addProduct)
router.get("/getProducts", authenticateToken, getProducts)
router.put("/editProducts/:productId", authenticateToken, editProducts)
router.delete("/deleteProduct/:productId", authenticateToken, deleteProducts)


module.exports = router
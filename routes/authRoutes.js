const express = require("express")
const authenticateToken = require("../middleware/authMiddleWare")
const { registerUser, signinUser, getUserProfile } = require("../controllers/authController")
const router = express.Router()

// creating a signup route
router.post("/signupRoute", registerUser)
// creating a signin route
router.post("/signinRoute", signinUser)

// creating a user profile route, if the token expires
router.get("/user_profile", authenticateToken, getUserProfile)

module.exports = router
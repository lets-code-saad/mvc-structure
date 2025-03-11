require("dotenv").config()
const jwt = require("jsonwebtoken")

const authenticateToken = async (req, res, next) => {
    const userToken = req.headers["authorization"]
    if (!userToken) {
        return res.status(401).json("Invalid Token")
    }
    try {
        // decoding the token and passing it to the user variable
        const decodeToken = jwt.verify(userToken, process.env.JWT_SECRET_KEY)
        req.user = decodeToken
        next()
    }
    catch (err) {
        return res.status(401).json(err)
    }
}

module.exports = authenticateToken;
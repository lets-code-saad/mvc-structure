require("dotenv").config()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");
const signup = require("../models/signup");

const registerUser = async (req, res) => {
    // restructuring signup details from the req body
    const { firstName, lastName, email, password } = req.body;
    // if any of the required details is missing
    if (!firstName || !email || !password) {
        return res.status(401).json({ message: "All fields are required!" })
    }
    // if the user is already registered
    const existingUser = await signup.findOne({ email })
    if (existingUser) {
        return res.status(409).json({ Error: "Account already exists" })
    }
    // creating email format 
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "Invalid email format" });
    }
    // creating strong password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ error: "Password must be at least 6 characters long, with at least one uppercase letter, one lowercase letter, one number, and one special character." });
    }
    // hashing the password
    const hashedPassword = await bcrypt.hash(password, 6)

    // saving the user before sending the success response.
    const newUser = new signup({ firstName, lastName, email, password: hashedPassword })
    await newUser.save()

    // if all the details are filled correctly
    res.status(201).json({
        message: "User Registered Successfully",
        userDetails: newUser
    })
}

const signinUser = async (req, res) => {
    const { email, password } = req.body;
    // if any of input is missing
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }
    // if user doesn't exists
    const userExists = await signup.findOne({ email })
    if (!userExists) {
        return res.status(403).json({ message: "Email or password is wrong" })
    }
    // if password is wrong
    const passwordMatch = await bcrypt.compare(password, userExists.password)
    if (!passwordMatch) {
        return res.status(403).json({ message: "Email or password is wrong" })
    }
    // generating token
    const token = jwt.sign({ userId: userExists._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })

    // if all the details are filled correctly
    res.status(200).json({
        message: "Loggedin Successfully",
        userDetails: {
            userExists,
            token: token
        }
    })

}

const getUserProfile = async (req, res) => {
    try {
        const user = await signup.findById(req.user.userId).select("-password")

        if (!user) {
            return res.status(404).json("Token not found")
        }
        res.json(user)
    } catch (err) {
        return res.status(401).json(err)
    }
}

module.exports = { signinUser, registerUser, getUserProfile }
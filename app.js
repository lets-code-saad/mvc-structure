require("dotenv").config()
const express = require("express")
const connectDB = require("./config/db")
const app = express()
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")

// parsing the data into json
app.use(express.json())

app.use("/auth", authRoutes)

app.use("/user", userRoutes)

// port
app.listen(8080, (req, res) => {
    console.log("Server Started")
})

// mongo db connection
connectDB()
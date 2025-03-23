require("dotenv").config()
const express = require("express")
const connectDB = require("./config/db")
const app = express()
const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")
const orderRoutes = require("./routes/orderRoutes")
const bodyParser = require("body-parser")
const cors = require("cors")

// allowing every port to access the api using cors(cross origin)
app.use(cors())

// parsing the data into json
// it can only parse the data of 100kb
// app.use(express.json())

// it can parse the data , for limit we set
app.use(bodyParser.json({limit:"3mb"}))

app.use("/auth", authRoutes)

app.use("/user", userRoutes)

app.use("/order", orderRoutes)

// port
app.listen(8080, (req, res) => {
    console.log("Server Started")
})

// mongo db connection
connectDB()
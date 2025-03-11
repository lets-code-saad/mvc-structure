require("dotenv").config()
const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://saadabbas594:${process.env.DB_PASSWORD}@firstcluster.wfbvt.mongodb.net/?retryWrites=true&w=majority&appName=firstCluster`)
            .then(console.log("MONGODB CONNECTED"))
            .catch((err) => console.log(err))
    }
    catch (err) {
        console.log(err)
    }
}

// export db function
module.exports = connectDB
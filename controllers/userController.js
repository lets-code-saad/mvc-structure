const signup = require("../models/signup");

const addProduct = async (req, res) => {
    try {
        // destructuring the details from the schema in the request
        const { name, price, category, description, weight, units } = req.body;
        // checking if the user exists on behalf of id , declared in the token
        const userId = req.user.userId

        const isUserExist = await signup.findById(userId)
        if (!isUserExist) {
            res.status(404).json({message:"User Not Found"})
        }
        isUserExist.products.push({
            name, price, category, description, weight, units
        })

        await isUserExist.save()

        res.status(200).json({message:"Products Added Successfully", isUserExist})
    } catch (error) {
      return res.status(404).json({ message: error })
    }
}

module.exports = { addProduct }
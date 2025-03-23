const signup = require("../models/signup");

const addProduct = async (req, res) => {
    try {
        // destructuring the details from the schema in the request
        const { name, price, category, description, weight, units } = req.body;
        // checking if the user exists on behalf of id , declared in the token
        const userId = req.user.userId

        const isUserExist = await signup.findById(userId)
        if (!isUserExist) {
            res.status(404).json({ message: "User Not Found" })
        }

        const imageBase64 = req.file.buffer.toString("base64")

        isUserExist.products.push({
            name,
            price,
            category,
            description,
            weight,
            units,
            imageBase64
        })

        await isUserExist.save()

        res.status(200).json({ message: "Products Added Successfully", isUserExist })
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}

const getProducts = async (req, res) => {
    try {
        const userId = req.user.userId
        const existingUser = await signup.findById(userId)
        // if user doesn't exists
        if (!existingUser) {
            return res.status(401).json({ message: "User Not Found" })
        }

        res.status(200).json({ message: "User Products", products: existingUser.products })
    }
    catch (err) {
        return res.status(500).json(err)
    }
}

const editProducts = async (req, res) => {
    try {
        // getting product id from the params present in the request
        const { productId } = req.params;  //we used variable 'productId' because it was passed in the route

        // getting product detail from the modal
        const { name,
            price,
            category,
            description,
            weight,
            units } = req.body;

        // getting user id from the front end side declared in the request
        const userId = req.user.userId
        const existingUser = await signup.findById(userId)
        if (!existingUser) {
            return res.status(404).json({ message: "User Not Found" })
        }
        // finding the id in the object, so it should only update that id product's data
        const product = existingUser.products.id(productId)
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" })
        }
        // updating the data of the product
        product.price = price;
        product.category = category;
        product.name = name;
        product.description = description;
        product.weight = weight;
        product.units = units;

        // saving the data into database
        await existingUser.save()

        return res.status(200).json({message:"Product Updated Successfully"})
    }
    catch (err) {
        return res.status(404).json({ message: "No Data Found" })
    }
}

const deleteProducts = async (req, res) => {
    try {

        const { productId } = req.params

        const userId = req.user.userId
        const existingUser = await signup.findById(userId)

        if (!existingUser) {
            return res.status(404).json("User Not Found")
        }
        const product = existingUser.products.id(productId)
        if (!product) {
            return res.status(404).json("Product Not Found")
    
        }
        // deleting the product
        await product.deleteOne()

        return res.status(200).json("Product Deleted Successfully")
    } catch (error) {
        return res.status(404).json({ message: error })
    }
}

module.exports = { addProduct, getProducts, editProducts, deleteProducts }
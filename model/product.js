const mongoose = require('mongoose')
const yup = require('yup')
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    size: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    }
})

//validate
const validateProduct = (product) => {
    const schema = yup.object().shape({
        name: yup.string().required(),
        category: yup.string().required(),
        price: yup.string().required(),
        color: yup.string().required(),
        size: yup.string().required(),
        img: yup.string().required()
    })
    return schema.validate(product).then(product => product).catch((err) => {
        return { message: err.message }
    })

}
exports.Product = new mongoose.model("Product", productSchema)
exports.validateProduct = validateProduct
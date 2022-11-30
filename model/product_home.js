const mongoose = require('mongoose')
const yup = require('yup')
const productHomeSchema = new mongoose.Schema({
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
    img1: {
        type: String,
        require: true
    },
    img2: {
        type: String,
        require: true
    },
    detail: {
        type: String,
        require: true
    },

})

//validate
const validateProduct = (product) => {
    const schema = yup.object().shape({
        name: yup.string().required(),
        category: yup.string().required(),
        price: yup.string().required(),
        color: yup.string().required(),
        size: yup.string().required(),
        img1: yup.string().required(),
        img2: yup.string().required(),
        detail: yup.string().required(),
    })
    return schema.validate(product).then(product => product).catch((err) => {
        return { message: err.message }
    })

}
exports.ProductHome = new mongoose.model("ProductHome", productHomeSchema)
exports.validateProduct = validateProduct
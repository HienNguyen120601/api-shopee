const mongoose = require('mongoose')
const yup = require('yup')
const cartSchema = new mongoose.Schema({
    product_id: {
        type: String,
        require: true
    },
    sum: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        require: true
    },
    customer_id: {
        type: String,
        require: true
    },

})

//validate
const validateCart = (cart) => {
    const schema = yup.object().shape({
        product_id: yup.string().required(),
        sum: yup.string().required(),
        date: yup.date().required(),
        customer_id: yup.string().required(),

    })
    return schema.validate(cart).then(cart => cart).catch((err) => {
        return { message: err.message }
    })

}
exports.Cart = new mongoose.model("Cart", cartSchema)
exports.validateCart = validateCart
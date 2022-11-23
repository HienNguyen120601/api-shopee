const mongoose = require('mongoose')
const yup = require('yup')
const customerSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    block: {
        type: Number,
        require: true
    },

})

//Validate

const validateCustomer = (customer) => {
    const schema = yup.object().shape({
        username: yup.string().required(),
        email: yup.string().required(),
        password: yup.string().required(),
        block: yup.number().required(),

    })
    return schema.validate(customer).then(customer => customer)
        .catch((err) => {
            return { message: err.message }
        })
}
exports.Customer = new mongoose.model("Customer", customerSchema)
exports.validateCustomer = validateCustomer
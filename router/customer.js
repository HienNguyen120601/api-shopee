const express = require('express')

const { Customer, validateCustomer } = require('../model/customer')
const router = express.Router()

//Post

router.post('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const err = await validateCustomer(req.body)
    if (err.message)
        res.status(400).send(err.message)
    customer = new Customer(
        {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            block: req.body.block,

        }
    )

    customer.save().then((customer) => {
        res.send(customer)
    })
        .catch((err) => {
            res.status(500).send(err)
        })

})

//Get all

router.get("/", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    Customer.find().then((customer) => res.send(customer)).catch((err) => {
        res.status(500).send('ERR')
    })

})


//Get by id

router.get("/:id", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const customer = await Customer.findById(req.params.id)
    if (!customer)
        res.status(404).send('Not found')
    else
        res.send(customer)

})

//UPdate

router.put("/:id", async (req, res) => {
    const updateCustomer = await Customer.findByIdAndUpdate(req.params.id, {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        block: req.body.block,

    }, { new: true })
    if (!updateCustomer)
        res.status(404).send("Not found")
    else {

        res.send(updateCustomer)
    }
    res.setHeader('Access-Control-Allow-Origin', '*');

})

//delete
router.post("/delete", async (req, res) => {
    let id = req.body.id;
    res.setHeader('Access-Control-Allow-Origin', '*');
    const customer = await Customer.findByIdAndRemove(id)
    if (!customer)
        res.status(404).send("Not found")
    else {
        res.send(customer)

    }

})
module.exports = router
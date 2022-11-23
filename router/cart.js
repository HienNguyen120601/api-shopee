const express = require('express')

const { Cart, validateCart } = require('../model/cart')
const router = express.Router()

//Post
router.post('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const err = await validateCart(req.body)
    if (err.message)
        res.status(400).send(err.message)
    cart = new Cart({
        product_id: req.body.product_id,
        sum: req.body.sum,
        date: req.body.date,
        customer_id: req.body.customer_id,

    })
    cart.save().then((cart) => {
        res.send(cart)
    }).catch((err) => {
        res.status(500).send(err)
    })
})
//Get all
router.get("/", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    Cart.find().then((cart) => res.send(cart)).catch((err) => {
        res.status(500).send(err)
    })
})
//Get by id

router.get("/:id", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const cart = await Cart.findById(req.params.id)
    if (!cart)
        res.status(404).send('Not found')
    else
        res.send(cart)

})
router.put("/:id", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const updateCart = await Cart.findByIdAndUpdate(req.params.id, {
        product_id: req.body.product_id,
        sum: req.body.sum,
        date: req.body.date,
        customer_id: req.body.customer_id,

    }, { new: true })
    if (!updateCart)
        res.status(404).send("Not found")
    else {

        res.send(updateCart)
    }

})
//delete
router.post("/delete", async (req, res) => {
    let id = req.body.id;
    res.setHeader('Access-Control-Allow-Origin', '*');
    const cart = await Cart.findByIdAndRemove(id)
    if (!cart)
        res.status(404).send("Not found")
    else {
        res.send(cart)

    }

})
module.exports = router
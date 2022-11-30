const express = require('express')

const { ProductHome, validateProduct } = require('../model/product_home')
const router = express.Router()

//Post
router.post('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const err = await validateProduct(req.body)
    if (err.message)
        res.status(400).send(err.message)
    productHome = new ProductHome({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        color: req.body.color,
        size: req.body.size,
        img: req.body.img,
        img2: req.body.img2,
        detail: req.body.detail,
        quanlity: req.body.quanlity
    })
    productHome.save().then((product) => {
        res.send(product)
    }).catch((err) => {
        res.status(500).send(err)
    })
})
//Get all
router.get("/", (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    ProductHome.find().then((product) => res.send(product)).catch((err) => {
        res.status(500).send(err)
    })
})
//Get by id

router.get("/:id", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const product = await ProductHome.findById(req.params.id)
    if (!product)
        res.status(404).send('Not found')
    else
        res.send(product)

})
router.put("/:id", async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    const updateProduct = await ProductHome.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        color: req.body.color,
        size: req.body.size,
        img: req.body.img,
        img2: req.body.img2,
        detail: req.body.detail,
        quanlity: req.body.quanlity



    }, { new: true })
    if (!updateProduct)
        res.status(404).send("Not found")
    else {

        res.send(updateProduct)
    }

})
//delete
router.post("/delete", async (req, res) => {
    let id = req.body.id;
    res.setHeader('Access-Control-Allow-Origin', '*');
    const product = await ProductHome.findByIdAndRemove(id)
    if (!product)
        res.status(404).send("Not found")
    else {
        res.send(product)

    }

})
module.exports = router
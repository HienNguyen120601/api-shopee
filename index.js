const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const corsOptions = {
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
//import route
const productRouter = require('./router/product')
const cartRouter = require('./router/cart')
const customerRouter = require('./router/customer')

//Create database
mongoose.connect("mongodb+srv://c2star07:hiennguyen123@cluster0.n0rogqq.mongodb.net/Shopee?retryWrites=true&w=majority")
    .then(() => {
        console.log('Success connected database')
    })
    .catch(() => {
        console.log("Something went wrong")
    })

//Use route

app.use('/api/product', productRouter)

app.use('/api/cart', cartRouter)

app.use('/api/customer', customerRouter)
app.get('/', (req, res) => {
    res.send("Chin chào !! This is api design and coding by Nguyên :3 .If you see this message. Have a good day moaz moaz :3")
})

const port = process.env.PORT || 9000
app.listen(port, () => { console.log('Starting server') })
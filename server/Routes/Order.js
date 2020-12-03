const router = require('express').Router();
const Product = require('../Models/Product');
const Order = require('../Models/Order');
const verify = require('../verifyToken');




router.post('/create', verify, async (req, res) => {
    if (!req.header('token')) {
        return res.json({ massage: "Some data is missing.." });
    }
    try {
        let cartItems = req.body.cartItems;
        for (let index = 0; index < cartItems.length; index++) {
            const productInCart = cartItems[index];
            const productInDB = await Product.findById(productInCart._id);
            if (productInDB.availableQuantity >= productInCart.count) {
                productInDB.availableQuantity -= productInCart.count;
                let productToSave = await Product(productInDB).save();
                console.log(productToSave);
            } else {
                res.status(500).json('Product not available');
            }
        }
        let order = await Order(req.body).save();
        res.json(order)
    } catch (error) {
        res.status(500).json('Error: ' + error);
    }
});


router.get('/', async (req, res) => {
    try {
        const orders = await Order.find({});
        res.send(orders)
    } catch (error) {
        res.status(500).send(error);
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params._id);
        res.send(order)
    } catch (error) {
        res.status(500).send(error);
    }
})

module.exports = router;



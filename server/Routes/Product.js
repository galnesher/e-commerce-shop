const router = require('express').Router();
const Product = require('../Models/Product');


router.get('', async (req, res) => {
    const products = await Product.find();
    try {
        res.json(products);

    } catch (error) {
        res.status(500).send('Error' + error);
    }
});



router.post('/create', async (req, res) => {
    const products = await Product.find();
    let productByTitle = products.find(product => product.title == req.body.title);
    if (productByTitle) {
        res.status(400).json({ error: 'Sorry, this product is exist.' });
    }
    else {
        const newProduct = new Product(req.body);
        try {
            const savedProduct = await newProduct.save();
            products.push(savedProduct);
            console.log('Product Created')
            res.json(savedProduct);
        } catch (error) { res.status(500).json('Error: ' + error); }
    }
});



router.put('/update/:id', async (req, res) => {
    User.findOneAndUpdate(req.params.id, req.body, (err, doc) => {
        if (!err) {
            res.send('product updated..');
            console.log('product updated');
        } else {
            res.status(400).send('Error with update: ' + err)
        }
    });
});


router.delete('/delete', async (req, res) => {
    Product.findByIdAndRemove(req.body._id, (err, doc) => {
        if (!err) {
            res.send(true);
        }
        else { res.status(400).json({ error: err }) }
    });
});


module.exports = router; 
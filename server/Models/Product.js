const mongoose = require('mongoose');


const Product = new mongoose.Schema({

    title: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    image: {
        type: String,
        required: true
    },

    description: {
        type: String,
        require: true
    },
    availableQuantity: {
        type: Number,
        required: true
    }


});

module.exports = mongoose.model('Products', Product);
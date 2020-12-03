const mongoose = require('mongoose');


const Order = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },



    cartItems: [{
        _id: String,
        title: String,
        price: Number,
        count: Number
    }],

    totalPrice: {
        type: Number,
        required: true
    },

    phoneNumber: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },
    postalcode: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },


},
    {
        timestamps: true
    }
)
module.exports = mongoose.model('Orders', Order);
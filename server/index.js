const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const dotenv = require('dotenv');
const mongoose = require('mongoose');

//Routes.
const userRoute = require('./Routes/User.js');
const productRoute = require('./Routes/Product');
const orderRoute = require('./Routes/Order');

dotenv.config();

app.use(express.json());

//MiddleWares
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    res.header('Access-Control-Allow-Methods', "PUT,POST,GET,DELETE,OPTIONS");
    next();
});

//Route Middlewares
app.use('/api/user', userRoute);
app.use('/api/product', productRoute);
app.use('/api/order', orderRoute);

mongoose.connect(process.env.DB_CONNECT, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("MongoDB Connected…")
    })
    .catch(err => console.log('Could not Connect to MongoDb !!!', err))


app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
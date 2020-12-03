const router = require('express').Router();
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { loginValidation, registerValidation } = require('../validations')




router.get('', async (req, res) => {
    const users = await User.find();
    try {
        res.json(users);

    } catch (error) {
        res.status(500).send('Error' + error);
    }
});


router.post('/register', async (req, res) => {
    //Validate data
    const { error } = registerValidation(req.body);
    if (error) { return res.status(400).json(error.details[0].message); }

    const emailExist = await User.findOne({ emailAddress: req.body.emailAddress });
    if (emailExist) { return res.status(400).json('Email Address alrady exist'); }

    //Hash password.
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const role = req.body.role == 'Admin' ? 'Admin' : 'User';
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        emailAddress: req.body.emailAddress,
        password: hashedPassword,
        role: role,
    });
    try {
        const savedUser = await user.save();
        console.log(savedUser);
        res.json(true);
    } catch (error) {
        res.status(500).json('Error' + error);
    }
});



router.post('/login', async (req, res) => {
    //Validate data
    const { error } = loginValidation(req.body);
    if (error) { return res.status(400).json(error.details[0].message); }

    const user = await User.findOne({ emailAddress: req.body.emailAddress });
    if (!user) { return res.status(400).json('Email Address is not found.'); }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) { return res.status(400).json('Invalid Password.') }

    //Create Token
    const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
    res.send({ token, user });
});






router.get('/checkrole', async (req, res) => {
    const token = req.header('token');
    if (!token) {
        res.status(400).send('Token didnt exist.')
    } else {
        try {
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            const user = await User.findById(verified._id);
            res.send(user.role === "Admin" ? true : false)
        } catch (error) {
            res.send(error);
        }
    }
});



module.exports = router;
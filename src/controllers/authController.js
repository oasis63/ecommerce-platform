// controllers/authController.js
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt');

exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, jwtConfig.secret, { expiresIn: jwtConfig.expire });
    res.status(201).send({ token });
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
        return res.status(401).send({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ id: user._id }, jwtConfig.secret, { expiresIn: jwtConfig.expire });
    res.status(200).send({ token });
};



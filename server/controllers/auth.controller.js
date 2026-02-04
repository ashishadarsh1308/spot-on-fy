const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

async function register(req, res) {
    try {
        const { username, email, password, role = "user" } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await userModel.findOne({
            $or: [{ username }, { email }]
        });

        if (existingUser) {
            return res.status(409).json({
                message: 'Username or email already exists'
            });
        }

        const hash = await bcrypt.hash(password, 10);

        // save user to db

        const user = new userModel({
            username,
            email,
            password: hash,
            role
        });

        const savedUser = await user.save();

        const token = jwt.sign({
            id: user._id, role: user.role
        }, process.env.JWT_SECRET);

        res.cookie('token', token);

        return res.status(201).json({
            message: 'User registered successfully',
            user
        });

    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function login(req, res) {

    const { username, email, password } = req.body;

    const isUserExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (!isUserExist) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, isUserExist.password);

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({
        id: isUserExist._id,
        role: isUserExist.role
    }, process.env.JWT_SECRET);

    res.cookie('token', token);

    return res.status(200).json({
        message: 'Login successful',
        user: isUserExist
    });

}

module.exports = {
    register,
    login
};
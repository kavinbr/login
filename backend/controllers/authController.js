const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const signup = async (req, res) => {
    const { name, email, password, gender } = req.body;

    // Basic validation
    if (!name || !email || !password || !gender) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate password complexity
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return res.status(400).json({ 
            message: 'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character' 
        });
    }

    try {
        // Check if the user already exists
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const nameExists = await User.findOne({ name });
        if (nameExists) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        // Hash the password and save the new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            gender,
        });

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};




const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check for admin credentials
        if (email === 'admin@email.com' && password === 'Admin@123') {
            const adminUser = {
                _id: 'admin-id', // Use a fixed ID or another way to identify admin
                role: 'admin',
                email: 'admin@email.com'
            };
            const token = jwt.sign({ id: adminUser._id, role: adminUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.json({ token, user: { name: 'Admin', email: adminUser.email, role: 'admin' } });
        }

        // Regular user login
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        user.count += 1;
        user.lastLogin = Date.now();
        await user.save();

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user: { name: user.name, email: user.email, gender: user.gender, count: user.count, lastLogin: user.lastLogin } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};








const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { signup, login, getUsers }; 
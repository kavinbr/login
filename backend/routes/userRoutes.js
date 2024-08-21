const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); 
const authMiddleware = require('../middleware/authMiddleware'); // Import authMiddleware

// Fetch all users (only accessible by authenticated users)
router.get('/users', authMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});

module.exports = router;

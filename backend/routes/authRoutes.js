const express = require('express');
const { signup, login, getUsers } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Correct route definitions with callback functions
router.post('/signup', signup);
router.post('/login', login);
router.get('/users', authMiddleware, getUsers); // Ensure getUsers is a function
router.post('/admin-login', login); 
module.exports = router;




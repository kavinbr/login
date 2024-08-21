// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const authRoutes = require('./routes/authRoutes');
// const connectDB = require('./config/db');
// const userRoutes = require('./routes/userRoutes'); 

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Database connection
// connectDB();
// const JWT_SECRET = process.env.JWT_SECRET;
// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api', userRoutes);
// // Server setup
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });


require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const connectDB = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

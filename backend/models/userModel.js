const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    count: { type: Number, default: 0 },
    lastLogin: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

module.exports = User;

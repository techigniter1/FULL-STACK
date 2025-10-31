const express = require('express');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');
const users = require('../data/users');

const router = express.Router();

// Login route
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
});

module.exports = router;

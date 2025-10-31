const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const { authenticateToken } = require('./middleware/auth');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/', authRoutes);

// Protected Route
app.get('/dashboard', authenticateToken, (req, res) => {
    res.json({ message: `Welcome to your dashboard, ${req.user.username}!` });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

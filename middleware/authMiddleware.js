// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    // Get token from header
    const token = req.header('Authorization');

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'Authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if user exists
        const user = await User.findById(decoded.user.id);
        if (!user) {
            return res.status(401).json({ message: 'Authorization denied' });
        }

        // Add user to request object
        req.user = user;
        next();
    } catch (err) {
        console.error(err.message);
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;

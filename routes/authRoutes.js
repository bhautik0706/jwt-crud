// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const authController = require('../controllers/authController');

// Register a user
router.post(
    '/register',
    [
        body('username', 'Please enter a valid username').notEmpty().trim(),
        body('password', 'Please enter a password with 6 or more characters')
            .isLength({ min: 6 })
            .trim(),
    ],
    authController.register
);

// Login
router.post(
    '/login',
    [
        body('username', 'Please enter a valid username').notEmpty().trim(),
        body('password', 'Password is required').notEmpty().trim(),
    ],
    authController.login
);

module.exports = router;

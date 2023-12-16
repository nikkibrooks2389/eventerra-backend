const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const userModel = require('./../models/userModel');
const validationErrorMiddleware = require('../middleware/validationErrorMiddleware');

// Validation middleware for user registration
const registrationValidation = [
    body('fullName').notEmpty().withMessage('Full Name is required'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password')
        .custom((value, { req }) => {
            if (value.length < 8) {
                throw new Error('Password must be at least 8 characters long');
            }
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(value)) {
                throw new Error('Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character');
            }
            return true;
        })
];

// User registration route with validation middleware
router.post('/register', registrationValidation, validationErrorMiddleware, async (req, res, next) => {
    const { fullName, email, password } = req.body;

    try {
        // Check if the email is already registered
        const existingUser = await userModel.findUserByEmail(email);

        if (existingUser) {
            return res.status(400).send('Email is already registered');
        }

        // If email is not registered, proceed with user registration
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            fullName,
            email,
            password: hashedPassword,
            created_date: new Date(),
        };

        await userModel.createUser(newUser);
        res.status(201).send('User registered successfully');
    } catch (error) {
        next(error);
    }
});

// User login
router.post('/login', async (req, res) => {
    try {
        const token = await authenticate(req.body.email, req.body.password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).send(error.message);
    }
});


// Request password reset
router.post('/request-reset-password', async (req, res) => {
    try {
        const user = await findUserByEmail(req.body.email);
        if (!user) {
            return res.status(404).send('User not found');
        }

        const resetToken = await generatePasswordResetToken(user.email);
        // Send email with resetToken here (using an email service like Nodemailer)
        res.status(200).send('Password reset email sent');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Reset password
router.post('/reset-password', async (req, res) => {
    try {
        const { email, token, newPassword } = req.body;
        await resetPassword(email, token, newPassword);
        res.status(200).send('Password has been reset successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});



module.exports = router;
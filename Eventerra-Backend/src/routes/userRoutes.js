const express = require('express');
const { createUser } = require('../models/userModel');
const { authenticate } = require('../services/authService');
const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
    try {
        await createUser(req.body);
        res.status(201).send('User created');
    } catch (error) {
        res.status(500).send(error.message);
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
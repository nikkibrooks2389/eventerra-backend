const { findUserByEmail } = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function authenticate(email, password) {
    const user = await findUserByEmail(email);
    if (!user) throw new Error('User not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error('Invalid password');

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}



async function generatePasswordResetToken(email) {
    // Generate a token (e.g., a random string or JWT)
    // Save the token in the user's record in the database with an expiration time
    // Return the token
}

async function resetPassword(email, token, newPassword) {
    // Verify the token
    // If the token is valid and not expired, hash the new password
    // Update the user's password in the database
}

module.exports = { authenticate, generatePasswordResetToken, resetPassword };
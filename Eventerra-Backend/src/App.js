const express = require('express');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

app.use(express.json()); // for parsing application/json

connectDB().then(() => {
    app.use('/api/users', userRoutes); // Using the user routes

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
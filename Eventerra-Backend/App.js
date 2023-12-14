const express = require('express');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json()); // for parsing application/json
app.use(cors({
    origin: 'http://192.168.1.215:19000/',
    // origin: 'https://minesweeper-master.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

connectDB().then(() => {
    console.log("here")
    app.use('/api/users', userRoutes); // Using the user routes

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
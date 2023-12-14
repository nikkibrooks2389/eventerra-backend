require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri);

const connectDB = async () => {
    try {
        await client.connect();
        const db = client.db();
        console.log("Connected successfully to MongoDB");
        return db;
    } catch (err) {
        console.error("Could not connect to MongoDB", err);
    }
};

const getDb = () => {
    return client.db();
};

module.exports = { connectDB, getDb };
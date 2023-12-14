require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://nbrooks2389:Alyssa1989!.@cluster0.p2pzvdf.mongodb.net/';

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

module.exports = { connectDB };
const { getDb } = require('./../config/db');
const bcrypt = require('bcrypt');

async function createUser(user) {
    const db = getDb();
    user.created_date = new Date();
    user.password = await bcrypt.hash(user.password, 10); // Hashing the password
    await db.collection('users').insertOne(user);
}

async function findUserByEmail(email) {
    const db = getDb();
    console.log("i am here")
    return await db.collection('users').findOne({ email });
}

async function updateUser(email, updates) {
    const db = getDb();
    await db.collection('users').updateOne({ email }, { $set: updates });
}

module.exports = { createUser, findUserByEmail, updateUser };
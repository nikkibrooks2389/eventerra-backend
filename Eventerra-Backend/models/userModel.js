const { getDb } = require('./../config/db');
const bcrypt = require('bcrypt');

async function createUser(user) {
    console.log("HERE?", getDb())
    const db = getDb();
    console.log(db)
    console.log(user)
    user.password = await bcrypt.hash(user.password, 10); // Hashing the password

    await db.collection('users').insertOne(user);
}

async function findUserByEmail(email) {
    const db = getDb();
    return await db.collection('users').findOne({ email });
}

async function updateUser(email, updates) {
    const db = getDb();
    await db.collection('users').updateOne({ email }, { $set: updates });
}

module.exports = { createUser, findUserByEmail, updateUser };
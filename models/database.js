const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = `mongodb://${process.env.MONGO_URL}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;

const connect = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB conectada');
    } catch (error) {
        console.error('Error conectando a MongoDB: ' + error);
        throw error;
    }
}

module.exports = { mongoose, connect, MONGO_URI };
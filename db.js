const mongoose = require('mongoose');
require('dotenv').config()
console.log(process.env.PASSWORD);
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://bhargavashankar2003:${process.env.PASSWORD}@cluster0.fhdikdq.mongodb.net/?retryWrites=true&w=majority`);
        console.log('Connected To DB..');
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { connectDB };
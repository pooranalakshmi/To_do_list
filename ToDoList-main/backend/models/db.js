const mongoose = require('mongoose');
require('dotenv').config(); 

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('MongoDB Connection Succeeded...');
    } catch (err) {
        console.error(`Error in DB Connection: ${err}`);
        process.exit(1);
    }
};

module.exports = connectDB;


const mongoose = require('mongoose');


const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://itsgauthamp:gautham1@cluster0.wjlh1rp.mongodb.net/urlShortner', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; // Re-throw the error to indicate the failure to connect
    }
};

module.exports = { connectToDatabase };

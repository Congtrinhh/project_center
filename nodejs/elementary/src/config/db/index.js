// all of the file is to connect to mongodb
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/congtrinhh_website', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected');
    } catch (error) {
        console.log('Connect failed');
    }
}

module.exports = { connect };

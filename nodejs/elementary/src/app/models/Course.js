const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Course = new Schema({
    name: { type: String, default: '', maxLength: 255 },
    description: { type: String },
    image: { type: String },
    createAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Course', Course);

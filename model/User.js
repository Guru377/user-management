const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    contact: {
        type: String,
        max: 10,
        require: true
    },
    address: {
        type: String,
        max: 250,
        min: 50
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 8
    },
    gender: {
        type: String
    },
    country: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now

    }
});

module.exports = mongoose.model('User', userSchema);
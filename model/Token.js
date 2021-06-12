const { required } = require("joi");
const mongoose = require("mongoose");

const TokenSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    auth: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now

    }
});

module.exports = mongoose.model('Token', TokenSchema);
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    notes: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Contact', contactSchema);

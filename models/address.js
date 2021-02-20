const mongoose = require('mongoose');

const addressSchema = new Mongoose.Schema({
    street: { type: String, required: true },
    houseNumber: { type: String, required: true },
    zipCode: { type: Number, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },

});

module.exports = mongoose.model('Address', addressSchema);
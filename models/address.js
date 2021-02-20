const Mongoose = require('mongoose');

const addressSchema = new Mongoose.Schema({
    street: { type: String, required: false },
    zipCode: { type: Number, required: false },
    city: { type: String, required: false },
    country: { type: String, required: false },
    contact: { type: Mongoose.Schema.Types.ObjectId, required: false, ref: 'Contact' }
});

module.exports = Mongoose.model('Address', addressSchema);
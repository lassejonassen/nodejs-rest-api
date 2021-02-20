const Mongoose = require('mongoose');

const birthdaySchema = new Mongoose.Schema({
    day: { type: Number, required: false },
    month: { type: String, required: false },
    year: { type: Number, required: false },
    contact: { type: Mongoose.Schema.Types.ObjectId, required: false, ref: 'Contact' }
});

module.exports = Mongoose.model('Birthday', birthdaySchema);
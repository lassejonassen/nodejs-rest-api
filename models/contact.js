const Mongoose = require('mongoose');
const Address = require('../models/address');
const Birthday = require('../models/birthday');

const contactSchema = new Mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: false },
    company: { type: String, required: false },
    jobTitle: { type: String, required: false },
    pvtMobile: { type: Number, required: false },
    wrkMobile: { type: Number, required: false },
    pvtEmail: { type:  String, required: false },
    wrkEmail: { type:  String, required: false },
    address: { type: Mongoose.Schema.Types.ObjectId, required: false, ref: 'Address' },
    birthday: { type: Mongoose.Schema.Types.ObjectId, required: false, ref: 'Birthday' },
    relation: { type:  String, required: false },
    notes: { type: String, required: false }
});

contactSchema.pre('remove', function(next) {
    Address.remove({client_id: this._id}).exec();
    next();
});

module.exports = Mongoose.model('Contact', contactSchema);
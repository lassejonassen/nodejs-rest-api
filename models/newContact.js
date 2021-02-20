const mongooose = require('mongoose');
const Address = require('address.js');

const contactSchema = new Mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    company: { type: String },
    jobTitle: { type: String },
    pvtMobile: { type: Number },
    wrkMobile: { type: Number },
    pvtEmail: { type:  String },
    wrkEmail: { type:  String },
    address: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Address'},
    birthday: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Birthday'},
    relation: { type:  String },    
});


module.exports = mongoose.model('Contact', contactSchema);
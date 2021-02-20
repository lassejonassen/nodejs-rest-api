const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');
const Address = require('../models/address');
const Birthday = require('../models/birthday');






/*****************************************/
/*         All Contacts route            */
/*****************************************/
router.get('/', async (req, res) => {
    const params = { title: 'All Contacts' };
    try {
        const contacts = await Contact.find();
        params.contacts = contacts;
        res.render('contacts/index', params);
    } catch {
        res.redirect('/');
    }    
});


/*****************************************/
/*         New Contact route             */
/*****************************************/
router.get('/new', (req, res) => {
    const params = {
        title: 'New Contact',
        contact: new Contact(),
        address: new Address(),
        birthday: new Birthday()
    }
    res.render('contacts/new', params);
});


/*****************************************/
/*         Create Contact route          */
/*****************************************/
router.post('/', async (req, res) => {
    const contact = new Contact({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        country: req.body.country,
        company: req.body.company,
        jobTitle: req.body.jobTitle,
        pvtMobile: req.body.pvtMobile,
        wrkMobile: req.body.wrkMobile,
        pvtEmail: req.body.pvtEmail,
        wrkEmail: req.body.wrkEmail,
        relation: req.body.relation,
        notes: req.body.notes
    });
    const address = new Address({
        street: req.body.street,
        houseNumber: req.body.houseNumber,
        zipCode: req.body.zipCode,
        city: req.body.city,
        country: req.body.country,
        contact: contact
    });
    contact.address = address;
    const birthday = new Birthday({
        day: req.body.day,
        month: req.body.month,
        year: req.body.year,
        contact: contact
    });
    contact.birthday = birthday;

    const params = {};
    try {
        const newContact = await contact.save();
        await birthday.save();
        await address.save();
        params.title = contact.firstname;
        params.contact = newContact;
        params.birthday = birthday;
        params.address = address;
        // res.redirect(`contacts/${ newContact.id }`, {contact: newContact });
        res.redirect('/');
    } catch {
        res.render('contacts/new', { title: 'Fejl opstod!'});
    }   
});


/*****************************************/
/*          Show Contact route           */
/*****************************************/
router.get('/:id', async (req, res ) => {
    const params = {};
    try {
        const contact = await Contact.findById(req.params.id).exec();
        const birthday = await Birthday.findById(contact.birthday).exec();
        const address = await Address.findById(contact.address).exec();
        params.contact = contact;
        params.birthday = birthday;
        params.address = address;
        params.title = contact.firstname
        res.render('contacts/show', params);
    } catch {
        res.redirect('/');
    }
});


/*****************************************/
/*          Edit Contact route           */
/*****************************************/
router.get('/:id/edit', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        const params = { contact: contact, title: 'Edit' };
        res.render('contacts/edit', params);
    } catch {
        res.redirect('/');
    }
});


/*****************************************/
/*         Update Contact route          */
/*****************************************/
router.put('/:id', async (req, res) => {
    let contact;

    try {
        contact = await Book.findById(req.params.id);
        contact.firstname = req.body.firstname;
        contact.lastname = req.body.lastname;
        contact.mobile = req.body.number;
    } catch {
        if (contact != null) {
            res.render('contacts/edit', params);
        } else {
            res.redirect('/');
        }
    }

    try {
        const newContact = await contact.save();
        res.redirect(`contacts/${ newContact.id }`);
    } catch {
        res.render('contacts/edit', params);
    }
});


/*****************************************/
/*         Delete Contact route          */
/*****************************************/



module.exports = router;

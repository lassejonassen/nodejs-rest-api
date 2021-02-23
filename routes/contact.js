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
        const contact = await Contact.findById(req.params.id).exec();
        const address = await Address.findById(contact.address).exec();
        const birthday = await Birthday.findById(contact.birthday).exec();
        const params = { 
            contact: contact, 
            address: address, 
            birthday: birthday,
            title: 'Edit' 
        };
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
    let address;
    let birthday;

    try {
        contact = await Contact.findById(req.params.id).exec();
        address = await Address.findById(contact.address).exec();
        birthday = await Birthday.findById(contact.birthday).exec();
        contact.firstname = req.body.firstname;
        contact.lastname = req.body.lastname;
        contact.company = req.body.company;
        contact.jobTitle = req.body.jobTitle;
        contact.pvtMobile = req.body.pvtMobile;
        contact.wrkMobile = req.body.wrkMobile;
        contact.pvtEmail = req.body.pvtEmail;
        contact.wrkEmail = req.body.wrkEmail;
        contact.relation = req.body.relation;
        contact.notes = req.body.notes;
        address.street = req.body.street;
        address.zipCode = req.body.zipCode;
        address.city = req.body.city;
        address.country =req.body.country;
        contact.address = address;
        birthday.day = req.body.day;
        birthday.month = req.body.month;
        birthday.year = req.body.year;
        contact.birthday = birthday;
    } catch {
        if (contact != null || address != null || birthday != null) {
            res.render('contacts/edit');
        } else {
            res.redirect('/');
        }
    }
    try {
        const params = {}
        const newContact = await contact.save();
        params.contact = newContact;
        const newAddress = await address.save();
        params.address = newAddress;
        const newBirthday = await birthday.save();
        params.birthday = newBirthday;
        params.title = 'Success';
        res.render('contacts/show', params);
    } catch {
        res.render('contacts/edit');
        console.log('failed');
    }
});


/*****************************************/
/*         Delete Contact route          */
/*****************************************/
router.delete('/:id', async (req, res) => {
    let contact;

    try {
        contact = await Contact.findById(req.params.id);
        await contact.remove()
        res.redirect('/contacts')
    } catch {
        if (contact != null) {
            res.render('contact/show', {
              contact: contact,
              errorMessage: 'Could not remove contact'
            })
          } else {
            res.redirect('/')
          }
    }
});


module.exports = router;

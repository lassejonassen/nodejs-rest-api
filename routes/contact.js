const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');

// All contacts route.
router.get('/', async (req, res) => {
    let searchOptions = {};

    if (req.query.firstname != null && req.query !== '') {
        searchOptions.firstname = new RegExp(req.query.firstname, 'i');
    }
    if (req.query.lastname != null && req.query !== '') {
        searchOptions.lastname = new RegExp(req.query.lastname, 'i');
    }

    try {
        const contacts = await Contact.find(searchOptions);
        res.render('contacts/index', {
            contacts: contacts,
            seachOptions: req.query
        });
    } catch {
        res.redirect('/');
    }
});


// New contact route.
router.get('/new', async (req, res) => {
    res.render('contacts/new', { contact: new Contact() });
});


// Create contact route.
router.post('/', async (req, res) => {
    const contact = Contact({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobile: req.body.mobile
    });

    try {
        const newContact = await contact.save();
        // res.redirect(`contacts/${ newContact.id }`);
        res.redirect('/contacts');
    } catch {
        res.render('contacts/new', {
            contact: contact,
            errorMessage: 'An error orccured while creating a new contact.'
        });
    }
});

module.exports = router;
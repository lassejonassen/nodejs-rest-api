const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');







// All Contacts route.
router.get('/', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.render('contacts/index', {
            title: 'All Contacts',
            contacts: contacts
        });
    } catch {
        res.redirect('/');
    }    
});

// New Contact route.
router.get('/new', (req, res) => {
    res.render('contacts/new', { contact: new Contact(), title: 'New Contact' });
});

// Create Contact route.
router.post('/', async (req, res) => {
    const params = {};
    // Creating the Contact object.
    const contact = new Contact({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        mobile: req.body.number,
        notes: req.body.notes
    });

    try {
        const newContact = await contact.save(function (err) {
            if (err) {
                console.log(err);
            }
        });
        res.redirect('/');
        // res.redirect(`contacts/${ newContact.id }`);
    } catch {
        console.log('Failed');
        res.render('contacts/new', { title: 'New Contact'});
    }   
});

// Show Contact route.
router.get('/:id', async (req, res ) => {
    try {
        const contact = await Contact.findById(req.params.id)
                                     .populate('contact')
                                     .exec();
        res.render('contact/show', { contact: contact});
    } catch {
        res.redirect('/');
    }
});

// Edit Contact Page route.
router.get('/:id/edit', async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        const params = {
            contact: contact,
            title: 'Edit'
        };
        res.render('contacts/edit', params);
    } catch {
        res.redirect('/');
    }
});

// Update Contact route.
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

module.exports = router;

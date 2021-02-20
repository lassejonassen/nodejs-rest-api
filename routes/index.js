const express = require('express');
const router = express.Router();
const Contact = require('../models/contact');


router.get('/', async (req, res) => {
    let contacts;
    try {
        contacts = await Contact.find().sort({ createdAt: 'desc' }).limit(3).exec();
    } catch {
        contacts = []
    }

    res.render('index', {
        title: 'Home Page',
        contacts: contacts
    });
});

module.exports = router;
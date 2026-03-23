console.log('🔥🔥🔥 INVENTORY ROUTES FILE IS LOADING 🔥🔥🔥');

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.send('TEST ROUTE IS WORKING!');
});


// Testing function to make sure route works
router.get('/detail/:id', (req, res) => {
    res.send('Vehicle detail page works! Vehicle ID: ' + req.params.id);
});

// Custom page route - show the form so users can submit their custom order requests
router.get('/custom', (req, res) => {
    res.render('custom', { title: 'Custom Order' });
});

// Custom form submission route - handle the form data and show a thank you message
router.post('/custom/submit', (req, res) => {
    res.send('<script>alert("Thank you! We will contact you soon."); window.location.href="/";</script>');
});

// Sedan page route
router.get('/views/sedan', (req, res) => {
    res.render('sedan', { title: 'Sedan Vehicles' });
});

module.exports = router;
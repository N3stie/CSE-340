console.log('🚗🚗 INVENTORY ROUTES FILE IS LOADING 🚗🚗');

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    // res.send('TEST ROUTE IS WORKING!');
});


// route for vehicle detail page
router.get('/detail/:id', (req, res) => {
    res.send('Vehicle detail page works! Vehicle ID: ' + req.params.id);
});

// route for custom order page
router.get('/custom', (req, res) => {
    res.render('custom', { title: 'Custom Order' });
});

// route for handling custom order form submission
router.post('/custom/submit', (req, res) => {
    res.send('<script>alert("Thank you! We will contact you soon."); window.location.href="/";</script>');
});

// route for sedan inventory page
router.get('/sedan', (req, res) => {
    res.render('sedan', { title: 'Sedan Vehicles' });
});

// route for suv inventory page
router.get('/suv', (req, res) => {
    res.render('suv', { title: 'SUV Vehicles' });
});

// route for truck inventory page
router.get('/truck', (req, res) => {
    res.render('truck', { title: 'Truck Vehicles' });
});

module.exports = router;
console.log('🚗🚗 INVENTORY ROUTES FILE IS LOADING 🚗🚗');

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
    res.send('TEST ROUTE IS WORKING!');
});

router.get('/detail/:id', (req, res) => {
    res.send('Vehicle detail page works! Vehicle ID: ' + req.params.id);
});

router.get('/custom', (req, res) => {
    res.render('custom', { title: 'Custom Order' });
});

router.post('/custom/submit', (req, res) => {
    res.send('<script>alert("Thank you! We will contact you soon."); window.location.href="/";</script>');
});

router.get('/sedan', (req, res) => {
    res.render('sedan', { title: 'Sedan Vehicles' });
});

module.exports = router;
console.log('🚗🚗 INVENTORY ROUTES FILE IS LOADING 🚗🚗');

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();
const invController = require('../controllers/invController');

router.get('/test', (req, res) => {
    // res.send('TEST ROUTE IS WORKING!');
});

// route for vehicle detail page
router.get('/detail/:id', invController.getVehicleDetail);

// route for custom order page
router.get('/custom', (req, res) => {
    res.render('custom', { title: 'Custom Order' });
});

// route for handling custom order form submission
router.post('/custom/submit', (req, res) => {
    res.send('<script>alert("Thank you! We will contact you soon."); window.location.href="/";</script>');
});

// DYNAMIC ROUTE for sedan, suv, truck - using controller (THIS IS THE ONLY ONE)
router.get('/:classification', invController.getVehiclesByClassification);

module.exports = router;
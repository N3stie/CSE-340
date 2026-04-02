console.log('🚗🚗 INVENTORY ROUTES FILE IS LOADING 🚗🚗');

const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const router = express.Router();
const invController = require('../controllers/invController');

router.get('/test', (req, res) => {
    // using this for testing the new addClassification function in the controller
    // res.send('TEST ROUTE IS WORKING!');
});

// Management view route
router.get('/', (req, res) => {
    res.render('inventory/management', { 
        title: 'Vehicle Management'
    });
});

// ============================================
//              SPECIFIC ROUTES
// ============================================

// Show add classification form
router.get('/add-classification', (req, res) => {
    res.render('inventory/add-classification', { 
        title: 'Add New Classification'
    });
});

// Process add classification form
router.post('/add-classification', invController.addClassification);

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

// ============================================
//              DYNAMIC ROUTE 
// ============================================
router.get('/:classification', invController.getVehiclesByClassification);



module.exports = router;
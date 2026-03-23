const express = require('express');
const router = express.Router();

// Test function to make sure route works
router.get('/detail/:id', (req, res) => {
    res.send('Vehicle detail page works! Vehicle ID: ' + req.params.id);
});

// Custom page route - show the form
router.get('/custom', (req, res) => {
    res.render('custom', { title: 'Custom Order' });
});

// Custom form submission route - handle the form data
router.post('/custom/submit', (req, res) => {
    // For now, just show an alert and redirect
    res.send('<script>alert("Thank you! We will contact you soon."); window.location.href="/";</script>');
});

// Test error route - triggers 500 error (ADD THIS AT THE BOTTOM)
router.get('/error-test', (req, res) => {
    throw new Error('This is a test error!');
});

module.exports = router;
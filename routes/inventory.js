const express = require('express');
const router = express.Router();

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
    // For now, just show an alert and redirect back to the homepage. In a real app, you'd want to save the form data to a database or send an email.
    res.send('<script>alert("Thank you! We will contact you soon."); window.location.href="/";</script>');
});

module.exports = router;
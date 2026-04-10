//this file will handle all the routes related to account management such as login, register, management and logout
const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');
const { checkLogin } = require('../middleware/auth');

// This route will show the login page
router.get('/login', accountController.showLogin);
router.post('/login', accountController.login);
router.get('/register', accountController.showRegister);
router.post('/register', accountController.register);
router.get('/management', checkLogin, accountController.showManagement);
router.get('/update', checkLogin, accountController.showUpdate);  
router.post('/update', checkLogin, accountController.updateAccount);  
router.post('/change-password', checkLogin, accountController.changePassword);  
router.get('/logout', accountController.logout);

module.exports = router;
const accountModel = require('../models/accountModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Show login page
async function showLogin(req, res) {
    res.render('account/login', { title: 'Login', error: null });
}

// Process login
async function login(req, res) {
    try {
        console.log('🔵 Login function called!');
        const { email, password } = req.body;
        
        const account = await accountModel.getAccountByEmail(email);
        
        if (!account) {
            return res.render('account/login', { title: 'Login', error: 'Invalid email or password' });
        }
        
        if (password !== account.account_password) {
            return res.render('account/login', { title: 'Login', error: 'Invalid email or password' });
        }
        
        const token = jwt.sign(
            { 
                account_id: account.account_id,
                account_firstname: account.account_firstname,
                account_lastname: account.account_lastname,
                account_email: account.account_email,
                account_type: account.account_type
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
        res.redirect('/account/management');
        
    } catch (error) {
        console.error(error);
        res.status(500).render('error');
    }
}

// Show register page
async function showRegister(req, res) {
    res.render('account/register', { title: 'Register', error: null });
}

// Process registration
async function register(req, res) {
    try {
        const { firstname, lastname, email, password, confirm_password } = req.body;
        
        if (password !== confirm_password) {
            return res.render('account/register', { title: 'Register', error: 'Passwords do not match' });
        }
        
        if (password.length < 6) {
            return res.render('account/register', { title: 'Register', error: 'Password must be at least 6 characters' });
        }
        
        const existingAccount = await accountModel.getAccountByEmail(email);
        
        if (existingAccount) {
            return res.render('account/register', { title: 'Register', error: 'Email already exists' });
        }
        
        await accountModel.registerAccount(firstname, lastname, email, password);
        res.redirect('/account/login');
        
    } catch (error) {
        console.error(error);
        res.status(500).render('error');
    }
}

// Show account management
async function showManagement(req, res) {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const account = await accountModel.getAccountById(decoded.account_id);
        
        res.render('account/management', { 
            title: 'Account Management',
            account: account
        });
    } catch (error) {
        console.error(error);
        res.redirect('/account/login');
    }
}


// Show update page
async function showUpdate(req, res) {
    try {
        const token = req.cookies.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const account = await accountModel.getAccountById(decoded.account_id);
        
        res.render('account/update', { 
            title: 'Update Account',
            account: account,
            error: null,
            message: null
        });
    } catch (error) {
        console.error(error);
        res.redirect('/account/login');
    }
}

// Update account information
async function updateAccount(req, res) {
    try {
        const { account_id, firstname, lastname, email } = req.body;
        
        const result = await accountModel.updateAccount(account_id, firstname, lastname, email);
        
        if (result) {
            // Update the JWT token with new info
            const newToken = jwt.sign(
                { 
                    account_id: result.account_id,
                    account_firstname: result.account_firstname,
                    account_lastname: result.account_lastname,
                    account_email: result.account_email,
                    account_type: result.account_type
                },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );
            res.cookie('token', newToken, { httpOnly: true, maxAge: 3600000 });
            
            res.render('account/update', { 
                title: 'Update Account',
                account: result,
                error: null,
                message: 'Account updated successfully!'
            });
        } else {
            const account = await accountModel.getAccountById(account_id);
            res.render('account/update', { 
                title: 'Update Account',
                account: account,
                error: 'Failed to update account',
                message: null
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).render('error');
    }
}

// Change password
async function changePassword(req, res) {
    try {
        const { account_id, password, confirm_password } = req.body;
        
        if (password !== confirm_password) {
            const account = await accountModel.getAccountById(account_id);
            return res.render('account/update', { 
                title: 'Update Account',
                account: account,
                error: 'Passwords do not match',
                message: null
            });
        }
        
        if (password.length < 6) {
            const account = await accountModel.getAccountById(account_id);
            return res.render('account/update', { 
                title: 'Update Account',
                account: account,
                error: 'Password must be at least 6 characters',
                message: null
            });
        }
        
        const result = await accountModel.updatePassword(account_id, password);
        
        if (result) {
            const account = await accountModel.getAccountById(account_id);
            res.render('account/update', { 
                title: 'Update Account',
                account: account,
                error: null,
                message: 'Password changed successfully!'
            });
        } else {
            const account = await accountModel.getAccountById(account_id);
            res.render('account/update', { 
                title: 'Update Account',
                account: account,
                error: 'Failed to change password',
                message: null
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).render('error');
    }
}

// Logout
async function logout(req, res) {
    res.clearCookie('token');
    res.redirect('/');
}

module.exports = { showLogin, login, showRegister, register, showManagement, logout, showUpdate, updateAccount, changePassword };
const pool = require('../database/db');

// Get account by email (used for login)
async function getAccountByEmail(email) {
    try {
        const sql = 'SELECT * FROM account WHERE account_email = $1';
        const result = await pool.query(sql, [email]);
        return result.rows[0];
    } catch (error) {
        console.error('Model error:', error);
        throw error;
    }
}

// Get account by ID (used for management page)
async function getAccountById(account_id) {
    try {
        const sql = 'SELECT account_id, account_firstname, account_lastname, account_email, account_type FROM account WHERE account_id = $1';
        const result = await pool.query(sql, [account_id]);
        return result.rows[0];
    } catch (error) {
        console.error('Model error:', error);
        throw error;
    }
}

// Register new account (used for registration)
async function registerAccount(firstname, lastname, email, password) {
    try {
        const sql = 'INSERT INTO account (account_firstname, account_lastname, account_email, account_password) VALUES ($1, $2, $3, $4) RETURNING *';
        const result = await pool.query(sql, [firstname, lastname, email, password]);
        return result.rows[0];
    } catch (error) {
        console.error('Model error:', error);
        throw error;
    }
}


// Update account information (firstname, lastname, email)
async function updateAccount(account_id, firstname, lastname, email) {
    try {
        const sql = 'UPDATE account SET account_firstname = $1, account_lastname = $2, account_email = $3 WHERE account_id = $4 RETURNING *';
        const result = await pool.query(sql, [firstname, lastname, email, account_id]);
        return result.rows[0];
    } catch (error) {
        console.error('Model error:', error);
        throw error;
    }
}

// Update password
async function updatePassword(account_id, password) {
    try {
        const sql = 'UPDATE account SET account_password = $1 WHERE account_id = $2 RETURNING *';
        const result = await pool.query(sql, [password, account_id]);
        return result.rows[0];
    } catch (error) {
        console.error('Model error:', error);
        throw error;
    }
}

module.exports = { getAccountByEmail, getAccountById, registerAccount, updateAccount, updatePassword };
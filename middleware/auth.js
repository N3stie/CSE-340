const jwt = require('jsonwebtoken');

// it will macke sure the user is logged in
function checkLogin(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.redirect('/account/login');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.redirect('/account/login');
    }
}

// Its going to check if user is Employee or Admin (for inventory management)
function checkEmployeeOrAdmin(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.redirect('/account/login');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.account_type === 'Employee' || decoded.account_type === 'Admin') {
            req.user = decoded;
            next();
        } else {
            res.redirect('/account/login');
        }
    } catch (error) {
        res.redirect('/account/login');
    }
}

// it will make user data available to all views (for header)
function setUserLocals(req, res, next) {
    try {
        const token = req.cookies.token;
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            res.locals.user = decoded;
            res.locals.loggedIn = true;
        } else {
            res.locals.user = null;
            res.locals.loggedIn = false;
        }
    } catch (error) {
        res.locals.user = null;
        res.locals.loggedIn = false;
    }
    next();
}

module.exports = { checkLogin, checkEmployeeOrAdmin, setUserLocals };
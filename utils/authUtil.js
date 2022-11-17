const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) =>{
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        // Set the token
        req.accessToken = bearerToken;
        // Next middleware
    }
    next();
}

function checkAuthenticated(req, res, next) {

    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/api/login')
}

module.exports = { verifyToken, checkAuthenticated };
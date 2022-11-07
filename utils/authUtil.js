const jwt = require('jsonwebtoken');
const { AUTH_SECRET } = process.env;

const verifyAuthToken = (accessToken) => {

    return jwt.verify(accessToken,AUTH_SECRET);
}
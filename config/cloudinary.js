const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const { API_SECRET, API_KEY, CLOUD_NAME } = process.env;

cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
})

module.exports = cloudinary;
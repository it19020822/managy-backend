const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String
    },
    emailToken: {
        type: String
    },
    gender: { 
        type: String
    },
    isVerified: {
        type: Boolean
    },
    type: { 
        type: String
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
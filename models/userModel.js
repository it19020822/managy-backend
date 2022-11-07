const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String
    },
    gender: { 
        type: String
    },
    type: { 
        type: String
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;
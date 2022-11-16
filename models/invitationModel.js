const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * Invitation Model to handle user verification
 */
const invitateScehma = Schema({
    email: {
        type: String,
        required: true
    },
    emailToken: {
        type: String,
        required: false
    },
    isVerified: {
        type: Boolean
    }
}, {
    timeStamps: true
})

const Invitation = mongoose.model('Invitation', invitateScehma);

module.exports = Invitation;
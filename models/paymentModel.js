const mongoose = require('mongoose');

const schema = mongoose.Schema;

const paymentSchema = new schema({
    userId: {
        type: String
    },
    paymentType: {
        type: String
    },
    amount: {
        type: Number
    },
    paymentDescription: {
        type: String
    }
},{
    timestamps: true
});

module.exports = payment = mongoose.model('payment',paymentSchema);
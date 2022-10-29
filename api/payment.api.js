const Payment = require('../models/paymentModel');

function addPayment(payload) {
    
    return new Promise((resolve,reject) => {

        const newPayment = new Payment(payload);

        newPayment.save().then((doc) => {
            resolve(doc);
        }).catch((err) => {
            reject(err);
        });

    });

}

function getPaymentById(id) {

    return new Promise((resolve,reject) => {

        Payment.findOne({_id: id}).then((doc) => {
            resolve(doc);
        }).catch((err) => {
            reject(err);
        });
    });

}

module.exports = { addPayment, getPaymentById }
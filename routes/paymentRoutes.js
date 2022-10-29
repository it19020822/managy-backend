const router = require('express').Router();
const { addPayment, getPaymentById } = require('../api/payment.api');

router.post('/', (req,res) => {

    addPayment(req.body).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });

});

router.get('/:id', (req,res) => {

    getPaymentById(req.params.id).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });

})

module.exports = router;
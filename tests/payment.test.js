const request = require('supertest');
const app = require('../app');
const Payment = require('../models/paymentModel')

jest.setTimeout(20000);

beforeAll(async () => {
    await Payment.deleteMany()
});

let id = '';

test('should post a new payment', async () => {

    await request(app).post('/payment').send({
        userId: "testUserId",
        paymentType: "VISA",
        amount: 5000,
        paymentDescription: "for Reasearch paper"
    }).expect(200).then((response) => {
        if ((response.body.userId != "testUserId") || (response.body.paymentType != "VISA")
            || (response.body.amount != 5000) || (response.body.paymentDescription != "for Reasearch paper")) {
            throw new Error('Failed test');
        }
        id = response.body._id;
    })

});

test('should get a payment by id', async () => {

    await request(app).get(`/payment/${id}`).expect(200).then((response) => {
        if ((response.body.userId != "testUserId") || (response.body.paymentType != "VISA")
            || (response.body.amount != 5000) || (response.body.paymentDescription != "for Reasearch paper")) {
            throw new Error('Failed test');
        }
    });

})


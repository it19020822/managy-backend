const app = require('../app');
const request = require('supertest');
const Workshop = require('../models/workshopModel');
const { response } = require('../app');

jest.setTimeout(40000);

let id = '';

beforeAll(async () => {
    await Workshop.deleteMany(); //delete already exist documents
});

test('should add a new workshop', async () => {
    await request(app).post('/workshop').send({
        workshopName: "workshopName1",
        workshopDescription: "workshopdes1",
        flyerURL: "testFlyerURL1",
        resourcePersons: [{ personName: "testPerson1", designation: "testDesi1" }],
        conferenceId: "testConfID1"
    }).expect(200).then((response) => {
        id = response.body._id;
    });

    await request(app).post('/workshop').send({
        workshopName: "workshopName2",
        workshopDescription: "workshopdes2",
        flyerURL: "testFlyerURL2",
        resourcePersons: [{ personName: "testPerson2", designation: "testDesi2" }],
        conferenceId: "testConfID2"
    }).expect(200).then((response) => {
        id = response.body._id;
    });
});


test('should get all workshops', async () => {
    await request(app).get('/workshop').expect(200).then(response => {
        if ((response.body[0].workshopName != "workshopName1") || (response.body[0].workshopDescription != "workshopdes1") ||
            (response.body[0].flyerURL != "testFlyerURL1")) {
            throw new Error('Test Fail')
        }
        id = response.body[0]._id
    }).catch(err => console.log(err));
});

test('should get a workshop by id', async () => {
    await request(app).get(`/workshop/${id}`).expect(200).then(response => {
        if ((response.body.workshopName != "workshopName2") || (response.body.testFlyerURL2 != "testFlyerURL2") ||
            (response.body.workshopDescription != "workshopdes2")) {
            throw new Error('Test Fail')
        }
    }).catch(err => console.log(err));
});

test('should update a workshop by id', async () => {
    await request(app).put(`/workshop/${id}`).send({
        workshopName: "workshopNameUpdate",
        workshopDescription: "workshopdesUpdate",
        flyerURL: "testFlyerURLUpdate",
    }).expect(200).then((response) => {
        if (response.body.workshopName == null) {
            console.log(response.body.workshopName)
            throw new Error('Test Fail');
        }
    });
});

test('should delete workshop by id', async () => {
    await request(app).delete(`/workshop/${id}`).expect(200);
})

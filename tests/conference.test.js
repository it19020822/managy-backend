const app = require('../app');
const request = require('supertest');
const Conference = require('../models/conferenceModel')

jest.setTimeout(30000);

let id = '';

beforeAll(async () => {
    await Conference.deleteMany(); // delete already existing documents
});

test('should post a new conference', async () => {
    await request(app).post('/conference').send({
        conferenceName: "testName1",
        conferenceDescription: "testDesc1",
        conferenceVenue: "sliit",
        keynoteSpeaker: [{ name: "keyNote1Name", designation: "keyNoteDes1" }, { name: "keyNote2Name", designation: "keyNoteDes2" }],
        startDate: new Date("2021-12-25"),
        endDate: new Date("2021-12-30"),
        tracks: [{ name: "Application Frameworks", description: "progamming languages" }],
        status: "pending approval",
        other: ""
    }).expect(200).then((response) => {
        id = response.body._id;
    });

    await request(app).post('/conference').send({
        conferenceName: "testName2",
        conferenceDescription: "testDesc2",
        conferenceVenue: "sliit",
        keynoteSpeaker: [{ name: "keyNote1Name", designation: "keyNoteDes1" }, { name: "keyNote2Name", designation: "keyNoteDes2" }],
        startDate: new Date("2021-12-25"),
        endDate: new Date("2021-12-30"),
        tracks: [{ name: "Application Frameworks", description: "progamming languages" }],
        status: "pending approval",
        other: ""
    });

});

test('should get all conferences', async () => {
    await request(app).get('/conference').expect(200).then(response => {
        if ((response.body[0].conferenceName != "testName1") || (response.body[0].conferenceDescription != "testDesc1")
            || (response.body[0].conferenceVenue != "sliit") || (response.body[0].status != "pending approval")) {
            throw new Error('Failed test');
        }
        id = response.body[0]._id
    })
        .catch(err => console.log(err));

});

test('should update conference by id', async () => {

    await request(app).put(`/conference/${id}`).send({
        conferenceDescription: "testDescUpdate",
        conferenceVenue: "testVenueUpdate",
        status: "Approved"
    }).expect(200).then((response) => {
        if (response.body.conferenceName == null) {
            console.log(response.body.conferenceName)
            throw new Error('Failed test');
        }
    });

    await request(app).put(`/conference/${id}`).send({
        conferenceName: "testName1",
        conferenceDescription: "testDescUpdate",
        conferenceVenue: "testVenueUpdate",
        status: "Approved"
    }).expect(200).then((response) => {
        console.log(response.body.conferenceName)
        if (response.body.conferenceName == null) {
            throw new Error('Failed test');
        }
    });

    await request(app).put(`/conference/${id}`).send({
        conferenceName: "testName2",
        conferenceDescription: "testDescUpdate",
        conferenceVenue: "testVenueUpdate",
        status: "Approved"
    }).expect(200).then((response) => {
        console.log(response.body)
        if (response.body != "Conference with same name exists") {
            throw new Error('Failed test');
        }
    });

});

test('should delete conference by id', async () => {
    await request(app).delete(`/conference/${id}`).expect(200);
});

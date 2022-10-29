const app = require('../app');
const supertest = require('supertest');
const { response, request } = require('../app');
const Submission = require('../models/submissionModel');

jest.setTimeout(10000);

beforeAll(async () => {
    await Submission.deleteMany(); // delete already existing documents
});

let id  = '';

test('should post insert a new submission', async () => {
    await supertest(app).post('/submission').send({

        topic :"TestTopic1",
        deadline:"test deadline",
        description:"test description",
        conferenceId:"test conferenceID"

    }).expect(200).then((response) => {
        id  = response.body._id;
    });
});

test('should get all submissions', async () => {
    await supertest(app).get('/submission').expect(200).then(response => {
        if(response.body[0].topic !== 'TestTopic1' || response.body[0].deadline !== 'test deadline'
        || response.body[0].description !== 'test description' || response.body[0].conferenceId !== 'test conferenceID' 
       ){
            throw new Error('Failed Test');
        }
    }).catch(err => console.log(err));
})

test('should update submission by id', async () => {
    await supertest(app).put(`/submission/${id}`).send({
        topic :"TestTopic1Updated",
        deadline:" test deadlineUpdated",
        description:"test descriptionUpdated",
        conferenceId:"test conferenceIDUpdated"


    }).expect(200)
    .then((response) => {
        if(response.body == null)
            throw new Error("Failed test");
    })
})

test('should delete submission by id', async () => {
    await supertest(app).delete(`/submission/${id}`).expect(200);
});


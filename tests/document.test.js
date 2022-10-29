const app = require('../app')
const request = require('supertest')
const Document =require('../models/documentModel')

jest.setTimeout(40000);

let id='';
let Uid='';

beforeAll(async()=>{
    await Document.deleteMany();
})

test('should create a new document ',async()=>{
    await request(app).post('/document').send({
        userId:"U01",
        activityId:"A01",
        type:" research paper",
        status:"not approved",
        fileId:"kdsoafa",
    }).expect(200).then((res)=>{
        id = res.body._id;
        Uid = res.body.userId;
    });
    await request(app).post('/document').send({
        userId:"U02",
        activityId:"A02",
        type:" research paper",
        status:"not approved",
        fileId:"kdsoafcvfa",
    }).expect(200).then((response)=>{

    });
});
test('should update the document by id',async()=>{
    await request(app).post(`/document/update/${id}`).send({
        status:"not approved",
        fileId:"koasla"
    }).expect(200).then((res)=>{
            if(res.body.status==null){
                    throw new Error('Failed test  document upate')
            }
    });
    await request(app).post(`/document/update/${id}`).send({
        status:"not approved",
        fileId:"jdsfjoj"
    }).expect(200).then((res)=>{
        if(res.body.status == null){
            throw new Error('Failed test document upate');
        }

    });
    
});
test('should get all document',async()=>{
    await request(app).get(`/document/${Uid}`).expect(200).then((res)=>{
        if((res.body[0].fileId == null )|| (res.body[0].status == null )|| (res.body[0].type == null) || (res.body[0].activityId == null) || (res.body[0].userId == null)){
                throw new Error('Failed test get all document')
        }
    }).catch(err=>{
        console.log(err)
    })
});
test('sholud delete the document from id',async()=>{
    await request(app).delete(`/document/delete/${id}`).expect(200);
});
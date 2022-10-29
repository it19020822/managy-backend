const Conference = require('../models/conferenceModel');

function addConference(payload) {

    return new Promise((resolve, reject) => {

        const conf = new Conference(payload);

        Conference.findOne({ conferenceName: payload.conferenceName }).then((doc) => {
            if (doc == null) {
                conf.save().then((conference) => {
                    resolve(conference);
                }).catch((err) => {
                    reject(err);
                });
            }
            else
                resolve("Conference with same name exists");
        })
    });

}

function getAllConferences() {

    return new Promise((resolve, reject) => {
        Conference.find().then((docs) => {
            resolve(docs);
        }).catch((err) => {
            reject(err)
        });
    });

}

function updateConferenceById(id, payload) {

    return new Promise((resolve, reject) => {
        if (payload.conferenceName){
            Conference.findOne({ conferenceName: payload.conferenceName }).then((doc) => {
                if (doc == null || doc._id == id) {
                    Conference.findByIdAndUpdate(id, { $set: payload }).then((doc) => {
                        console.log(doc)
                        resolve(doc);
                    }).catch((err) => {
                        reject(err);
                    })
                }
                else
                    resolve("Conference with same name exists");
            }).catch((err) => {
                reject(err);
            })
        }
        else{
            Conference.findByIdAndUpdate(id, { $set: payload }).then((doc) => {
                doc.status = 'Approved'
                console.log(doc)
                resolve(doc);
                
            }).catch((err) => {
                reject(err);
            });    
        }

    });

}

function removeConferenceById(id) {

    return new Promise((resolve, reject) => {
        Conference.findByIdAndRemove(id).then(() => {
            resolve("Successfully deleted");
        }).catch((err) => {
            reject(err);
        });
    });

}

module.exports = { addConference, getAllConferences, removeConferenceById, updateConferenceById }


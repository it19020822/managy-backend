const File = require('../models/fileModel');
const { remove } = require("./uploader.api");

const userId = "636938e63170ad59f2e00506";

function insertDocument(payload) {

    return new Promise((resolve, reject) => {
        const file = new File({ publicId: payload.public_id, fileUrl: payload.url, userId: userId, type: "file" });
        file.save().then((doc) => {
            resolve(doc);
        }).catch((err) => {
            reject(err);
        });
    });
}

function deleteDocument(id) {
    
    return new Promise((resolve, reject) => {
    File.findByIdAndDelete(id).then((doc) => {
    
        remove(doc.publicId).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
        });
    }).catch((err) => {
        reject(err);
    });
}

function getMyDocs(userId) {

    return new Promise((resolve, reject) => {

        File.find({userId: userId}).then((docs) => {
            resolve(docs);
        }).catch((err) => {
            reject(err);
        });

    });
}


module.exports = { insertDocument, deleteDocument, getMyDocs };
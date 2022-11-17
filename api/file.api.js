const File = require('../models/fileModel');

function insertDocument(payload) {

    return new Promise((resolve, reject) => {
        const file = new File({ publicId: payload.public_id, fileUrl: payload.url, userId: 'userId', type: "file" });
        file.save().then((doc) => {
            resolve(doc);
        }).catch((err) => {
            reject(err);
        });
    });
}

function deleteDocument(id) {
    
    
}


module.exports = { insertDocument };
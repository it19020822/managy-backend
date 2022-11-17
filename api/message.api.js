const Message = require('../models/messageModel');
// const decrypt = require('../utils/messageUtil');
// const encrypt = require('../utils/messageUtil');

function addMessage(payload) {
    
    return new Promise((resolve,reject) => {

        const newMessage = new Message(payload);

        newMessage.save().then((doc) => {
            resolve(doc);
        }).catch((err) => {
            reject(err);
        });

    });

}

function getMessageById(id) {

    return new Promise((resolve,reject) => {

        Message.findOne({_id: id}).then((doc) => {
            resolve(doc);
        }).catch((err) => {
            reject(err);
        });
    });

}

function deleteMessageById(id) {
    return new Promise((resolve, reject) => {
      Message.findByIdAndDelete(id)
        .then((message) => {
          resolve(message);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  function updateMessage(payload,id){
    return new Promise((resolve,reject)=>{
        Message.findByIdAndUpdate(id).then((messageDoc)=>{
            (payload.userId ?( messageDoc.userId = payload.userId):null),
            (payload.message ?(messageDoc.message = payload.message):null)
            // (payload.type ? (messageDoc.type = payload.type):null),
            // (payload.status ?(messageDoc.status = payload.status):null),
            // (payload.file?(messageDoc.file = payload.file.originalname ):null)
            messageDoc.save().then((doc)=>resolve(doc)).catch((err)=>reject(err))
        }).catch(err=>{
            reject(err)
        })
        })
}

function getMessageByUserId(id){
    return new Promise((resolve,reject)=>{
        Message.find({userId:id}).then(messages=>{
            resolve(messages)
        }).catch(err=>{
            reject(err)
        })
    })
}

module.exports = { addMessage,deleteMessageById,getMessageByUserId,updateMessage,getMessageById}
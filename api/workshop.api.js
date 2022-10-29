const Workshop = require('../models/workshopModel');
const cloudinary = require('../config/cloudinary')


function addWorkshop(payload) {
    return new Promise((resolve, reject) => {

        Workshop.findOne({workshopName: payload.workshopName }).then((docs) => {
            if(docs == null) {
                cloudinary.uploader.upload(payload.file,{
                    upload_preset: 'ml_default'
                }).then((result) => {
                    console.log(result);
                    const workS = {
                        workshopName: payload.workshopName,
                        workshopDescription: payload.workshopDescription,
                        flyerURL: result.secure_url,
                        resourcePersons: payload.resourcePersons,
                        conferenceId: payload.conferenceId
                    }
                    const workshop = new Workshop(workS);
    
                    workshop.save().then((workshop) => {
                        resolve(workshop);
                    }).catch((err) => {
                        reject(err);
                    });
                })

            }
            else{
                reject("Workshop with same name exists")
            }
        });
    });
}

function getAllWorkshops() {
    return new Promise((resolve, reject) => {
        Workshop.find().then((docs) => {
            resolve(docs);
        }).catch((err) => {
            reject(err);
        });
    });
}

function getWorkshopById(id) {
    return new Promise((resolve, reject) => {
        Workshop.findById(id).then((docs) => {
            resolve(docs);
        }).catch((err) => {
            reject(err)
        });
    });
}

function updateWorkshopById(id, payload){
    return new Promise((resolve, reject) => {
        if(payload.workshopName){
            Workshop.findOne({workshopName: payload.workshopName }).then((docs) => {
                if(docs == null || docs._id == id){
                    Workshop.findByIdAndUpdate(id, {$set: payload}).then((docs) => {
                        resolve(docs);
                    }).catch((err) => {
                        reject(err);
                    }) 
                }
                else
                    resolve("Workshop with same name exists");
            }).catch((err) => {
                reject(err);
            })
        }
        else{
            Workshop.findByIdAndUpdate(id, { $set: payload }).then((docs) => {
                resolve(docs);
            }).catch((err) => {
                reject(err);
            });    
        }
       
    });
}

function removeWorkshopById(id) {
    return new Promise((resolve, reject) => {
        Workshop.findByIdAndRemove(id).then(() => {
            resolve("Successfully deleted");
        }).catch((err) => {
            reject(err);
        })
    })
}

function updateWorkshopWorkforce(payload,id){
    console.log('api updateWorkshopWorkforce id: ', id);
    console.log('api updateWorkshopWorkforce payload: ', payload);
    return new Promise((resolve,reject) => {
        Workshop.findByIdAndUpdate(id).then(workshop => {
            workshop.resourcePersons.push(payload.resourcePersons),

            workshop.save().then((work) => resolve(work)).catch((err) => reject(err))
        })
    })

}


module.exports = {addWorkshop, getAllWorkshops, getWorkshopById, updateWorkshopById, removeWorkshopById ,updateWorkshopWorkforce}

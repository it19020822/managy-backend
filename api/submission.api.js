let Submission = require('../models/submissionModel');
const {getAllDocuments} = require('./document.api');

function createSubmission(body) {

  return new Promise((resolve, reject) => {
    const newSub = new Submission(body);

    newSub
      .save()
      .then((sub) => {
        resolve(sub);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getAllSubmission() {
    return new Promise((resolve,reject) => {
        Submission.find((err,docs) => {
            err ? reject(err) : resolve(docs);
        })
    })
}

function getSubmissionById(id) {
    return new Promise((resolve,reject) => {
        Submission.findById(id)
        .then((submission) => {
            resolve(submission);
        })
        .catch((err) => {
            reject(err);
        })
    })
}

function deleteSubmissionById(id) {
    return new Promise((resolve,reject) => {
        Submission.findById(id).then((sub) => {
          getAllDocuments().then((docs) => {
            docs.filter(doc=> doc.type == "RESEARCH").find(d=> d.activityId == sub._id) ?
            resolve('documents exist'):(
              Submission.findByIdAndRemove(id).then((res) => {
                resolve(res);
              })
            )
          })
        }).catch((err) => {
            reject(err)
        })
    })
}

function updateSubmissionById(body) {
    console.log("body: ", body);
 
    return new Promise((resolve, reject) => {
      Submission.findByIdAndUpdate(body._id,{$set: body}).then((sub) => {
        console.log(sub);
        resolve(sub);
      }).catch((err) => {
        resolve(err)
      })
    });
  }






module.exports = {
    createSubmission,
    getAllSubmission,
    updateSubmissionById,
    deleteSubmissionById,
    getSubmissionById
  };

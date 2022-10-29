const router = require('express').Router();
const {  createSubmission,
    getAllSubmission,
    updateSubmissionById,
    deleteSubmissionById,
    getSubmissionById } = require('../api/submission.api');

// submission routes = {
//     POST,GET,PUT, DELETE
//     model - {
//     topic,
//     deadline,
//     description,
//     conferenceId
//     }
// }

router.post('/', (req, res) => {

    createSubmission(req.body).then((newSub) => {
        res.json(newSub);
    }).catch((err) => {
        console.log(err);
    })

})

router.get('/', (req,res) => {
    getAllSubmission().then((subs) => {
        res.json(subs);
    }).catch((err) => {
        console.log(err);
    })
})

router.put('/:id', (req,res) => {
    
    req.body._id = req.params.id;

    updateSubmissionById(req.body).then((sub) => {
        res.json(sub);
    }).catch((err) => {
        console.log('err: ', err);
    })
})

router.get('/:id', (req,res) => {
    getSubmissionById(req.params.id).then((sub) => {
        res.json(sub)
    }).catch((err) => {
        console.log(err);
    })
})

router.delete('/:id' , (req,res) => {
    deleteSubmissionById(req.params.id).then((sub) => {
        res.json(sub);
    }).catch((err) => {
        console.log(err);
    })
})


module.exports = router;
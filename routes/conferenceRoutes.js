const router = require('express').Router();
const { addConference, getAllConferences, updateConferenceById, removeConferenceById } = require('../api/conference.api')

router.post('/', (req, res) => {

    addConference(req.body).then((newConf) => {
        res.json(newConf);
    }).catch((err) => {
        console.log(err);
    })

});

router.get('/', (req, res) => {

    getAllConferences().then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    })

})

router.put('/:id', (req,res) => {

    updateConferenceById(req.params.id,req.body).then((result)=>{
        res.json(result);
    }).catch((err) => {
        console.log(err);
    })

})

router.delete('/:id', (req, res) => {

    removeConferenceById(req.params.id).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    })

})

module.exports = router;
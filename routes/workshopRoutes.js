const router = require('express').Router();
const {addWorkshop, getAllWorkshops, getWorkshopById, updateWorkshopById, removeWorkshopById,updateWorkshopWorkforce} = require('../api/workshop.api');

//** POST METHOD TO ADD WORKSHOP DETAILS USING 'addWorkshop' FUNCTION*/
router.post('/', (req, res) => {
    addWorkshop(req.body).then((shop) => {
        res.json(shop);
    }).catch((err) => {
        console.log(err);
    })
});

//** GET METHOD TO GET ALL WORKSHOP DETAILS USING 'getAllWorkshops' FUNCTION*/
router.get('/', (req, res) => {
    getAllWorkshops().then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    })
});

//** GET METHOD TO GET WORKSHOP DETAIL BY ID USING 'getWorkshopById' FUNCTION*/
router.get('/:id', (req,res) => {
    getWorkshopById(req.params.id).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    })
});

//** PUT METHOD TO UPDATE WORKSHOP DETAILS USING 'updateWorkshopById' FUNCTION*/
router.put('/:id', (req,res) => {
    console.log(' UPDATE WORKSHOP DETAILS');
     updateWorkshopById(req.params.id,req.body).then((result) => {
         res.json(result);
     }).catch((err) => {
         console.log(err);
     })
});

//** DELETE METHOD TO DELETE WORKSHOP DETAIL BY ID USING 'removeWorkshopById' FUNCTION*/
router.delete('/:id', (req, res) => {
    removeWorkshopById(req.params.id).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    })
})

router.post('/update/workforce/:id', (req,res)=>{

    updateWorkshopWorkforce(req.body,req.params.id).then((doc)=>{
        res.json(doc)
    }).catch((err)=>{
        console.log(err)
    })
})

module.exports = router;
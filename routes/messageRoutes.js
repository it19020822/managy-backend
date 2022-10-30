const router = require('express').Router();
const { addMessage,deleteMessageById,getMessageByUserId,updateMessage,getMessageById} = require('../api/message.api');

router.post('/', (req,res) => {

    addMessage(req.body).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });

});

// router.get('/:id', (req,res) => {

//     getMessageById(req.params.id).then((result) => {
//         res.json(result);
//     }).catch((err) => {
//         console.log(err);
//     });

// })
router.get('/:id',(req,res)=>{
    getMessageByUserId(req.params.id).then(documents=>{
        res.json(documents)
    }).catch(err=>{
        console.log(err)
    })
})
router.delete('/delete/:id',(req,res)=>{
    deleteMessageById(req.params.id).then((doc)=>{
        res.json(doc)
    }).catch((err)=>{
        console.log(err)
    })
})
router.post('/update/:id', (req,res)=>{

    updateMessage(req.body,req.params.id).then((doc)=>{
        res.json(doc)
    }).catch((err)=>{
        console.log(err)
    })
})

module.exports = router;
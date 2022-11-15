const router  = require('express').Router();
const { createuser, getAllUsers, getUserById ,deleteUserById, updateUserById,getUsetByEmailAndPassword,getEmailAndPassCode }  = require('../api/user.api');
const jsonwebtoken = require('jsonwebtoken');
const passport = require('passport');
let User = require("../models/userModel");




let users = [
    // {
    //     _id: '636938e03170ad59f2e00503',
    //     name: 'testName6',
    //     email: 'testEmail6',
    //     password: 'testPassword',
    //     emailToken: 'token',
    //     gender: 'male',
    //     isVerified: true,
    //     type: '',
    //     createdAt: '2022-11-07T16:57:04.321Z',
    //     updatedAt: '2022-11-07T16:57:04.321Z',
    //     __v: 0
    // },
    // {
    //     _id: '636938e63170ad59f2e00506',
    //     name: 'testName7',
    //     email: 'testEmail7',
    //     password: 'testPassword',
    //     emailToken: 'token',
    //     gender: 'male',
    //     isVerified: true,
    //     type: '',
    //     createdAt: '2022-11-07T16:57:10.582Z',
    //     updatedAt: '2022-11-07T16:57:10.582Z',
    //     __v: 0
    // }
];

const fetchUsers = () => {
    return new Promise((resolve, reject) => {
        User.find((err, docs) => {
            users = docs;
        //   err ? reject(err) : resolve(docs);
        });
      });
}

fetchUsers();

const initializePassport = require('../config/passport-config');
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

     //add user

router.post('/add', (req, res) => {

    createuser(req.body).then((newUser) => {
        const token = jsonwebtoken.sign({
            _id:newUser._id,
            name :newUser.name,
            email : newUser.email,
            gender : newUser.gender,
            type : newUser.type,
            phoneNumber :newUser.phoneNumber
        },"jwtSecret")
        res.json(token);

    }).catch((err) => {
        console.log(err);
    })
})



//get all users
router.get('/',checkAuthenticated, (req, res) => {

    getAllUsers().then((docs) => {
        res.json(docs);
    }).catch((err) => {
        console.log('err: ', err);
    })

})

//get All users by id

router.get('/:id', (req, res) => {
    getUserById(req.params.id).then((user) => {
        res.json(user);
    })
})

router.post('/getUser',(req,res)=>{
    console.log('router getuser');
    getUsetByEmailAndPassword(req.body).then(user=>{
        console.log('in router get');
        console.log(user);
        if(user ===null){
            res.json(null);
        }
        else{
            const token = jsonwebtoken.sign({
                _id:user._id,
                name :user.name,
                email : user.email,
                gender : user.gender,
                type : user.type,
                phoneNumber :user.phoneNumber,
            },"jwtSecret")
            const password = user.password;
            console.log('in router get');
            res.json({token,password});
        }
        
        
    }).catch(err=>{
        console.log('err pasindu');
        console.log(err);
    })
})

router.delete('/:id', (req, res) => {
    
    deleteUserById(req.params.id).then((user) => {
        res.json(
            user.name + ' is deleted'
        )
    })
})

router.post('/update/:id', (req, res) => {

 console.log('in router post')
 console.log(req.body)
    updateUserById(req.params.id,req.body)
        .then((user) => {
            console.log('in router post in then')
            const token = jsonwebtoken.sign({
                _id:user._id,
                name :user.name,
                email : user.email,
                gender : user.gender,
                type : user.type,
                phoneNumber :user.phoneNumber
            },"jwtSecret")
            res.json(
                {token}
            )
        })
})

router.post('/getCode',(req,res)=>{
    console.log('router post');
    console.log(req.body);
    getEmailAndPassCode(req.body.email).then(details=>{
        if(details._id){
            console.log('router post in getEmail')
            const token = jsonwebtoken.sign({
                _id:details._id,
                email : details.email,
                code:details.code
            },"jwtSecret")
            res.json({token});
        }
        res.json(null)
       
    }).catch((err)=>{
        console.log('err');
        console.log(err);
        res.json(null)
    })
})

router.get('/api/login',
 passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/api/login',
    failureFlash: true
})

)

router.delete('/api/logout', (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/api/login');
    })
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/api/login')
}

function checkNotAutheticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}

module.exports = router;
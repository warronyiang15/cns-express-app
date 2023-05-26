const express = require('express');
const router = express.Router();

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
};

/* 
Cookie-based authentication
*/
router.post('/', asyncMiddleware(async (req, res) => {
    //set cookies
    if( !req.body.username || !req.body.password ){
        return res.status(401).json({'message': 'bye'});
    }

    console.log(req.body.username)
    console.log(req.body.password)

    if( req.body.username === 'CNS-user' && req.body.password === 'CNS-password' ){
        res.cookie('username', req.body.username);
        res.cookie('password', req.body.password);
        return res.status(200).json({'message': 'free cookies!'});
    }

    return res.status(401).json({'message': 'bye'});
}));

router.get('/', asyncMiddleware(async (req, res) => {
    // get cookie
    console.log(req.cookies)
    if( !req.cookies ){
        return res.status(401).json({'message': 'bye'});
    }
    if( !req.cookies['username'] || !req.cookies['password'] ){
        return res.status(401).json({'message': 'bye'});
    }
    if( req.cookies['username'] === 'CNS-user' && req.cookies['password'] === 'CNS-password' ){
        return res.status(200).json({'message': "HERE YOU GO BABY!"});
    }
    return res.status(401).json({'message': 'bye'});
}));

module.exports = router;
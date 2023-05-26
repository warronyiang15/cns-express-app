const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
};

/* The 'BASIC' Authentication Scheme 
router.get('/', asyncMiddleware(async (req, res) => {
    const auth = req.headers['authorization'] || req.headers['Authorization']
    if( !auth ){
        return res.status(401).json({'message': 'bye'});
    }
    const basic_auth = auth.split(' ')
    if( basic_auth[0] !== 'Basic' ){
        return res.status(401).json({'message': 'bye'});
    }
    const credentials = Buffer.from(basic_auth[1], 'base64').toString('ascii')
    const credentials_parse = credentials.split(':')
    if( credentials_parse.length != 2 ){
        return res.status(401).json({'message': 'bye'});
    }
    const username = credentials_parse[0];
    const password = credentials_parse[1];
    if( username === 'CNS-user' && password === 'CNS-password'){
        return res.status(200).json({'message': "HERE YOU GO BABY!"});
    }
    return res.status(401).json({'message': 'bye'});
}));
*/

/* 
Cookie-based authentication
*/
router.post('/', asyncMiddleware(async (req, res) => {
    //set cookies
    if( !req.body.username || !req.body.password ){
        return res.status(401).json({'message': 'bye'});
    }

    res.cookie('username', req.body.username);
    res.cookie('password', req.body.password);
    return res.status(200).json({'message': 'free cookies!'});
}));

router.get('/', asyncMiddleware(async (req, res) => {
    // get cookie
    console.log(req.cookie)
    if( !req.cookie.username || !req.cookie.password ){
        return res.status(401).json({'message': 'bye'});
    }
    if( req.cookie.username === 'CNS-user' && req.cookie.password === 'CNS-password' ){
        return res.status(200).json({'message': "HERE YOU GO BABY!"});
    }
    return res.status(401).json({'message': 'bye'});
}));

/*
JWT-based authentication
*/
//router.post('/', asyncMiddleware(async (req, res) => {
    //set cookies
//}));

//router.get('/', asyncMiddleware(async (req, res) => {
    //verify cookies
//}));

module.exports = router;
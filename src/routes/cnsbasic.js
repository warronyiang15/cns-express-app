const express = require('express');
const router = express.Router();

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
};

/* The 'BASIC' Authentication Scheme */
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

module.exports = router;
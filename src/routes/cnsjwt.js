const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
};

/*
JWT-based authentication
*/
// In pratical, this will store in .env files and not exposed in repo
JWT_SECRET='4c0d608098b78d61cf5654965dab8b53632bf831dc6b43f29289411376ac107b'
router.post('/', asyncMiddleware(async (req, res) => {
    //set cookies
    if( !req.body.username || !req.body.password ){
        return res.status(401).json({'message': 'bye'});
    }
    if( req.body.username === 'CNS-user' && req.body.password === 'CNS-password' ){
        const token = jwt.sign(
            { 
                username: req.body.username,
                password: req.body.password    
            },
            JWT_SECRET,
            {
              expiresIn: "2h",
            }
        );
        return res.status(200).json(token);
    }
    else{
        return res.status(401).json({'message': 'bye'});
    }
}));

router.get('/', asyncMiddleware(async (req, res) => {
    //verify cookies
    const authHeader = req.headers["authorization"];
    let token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({'message': 'bye'});
    }
    if( token[0] === '"' || token[token.length - 1] === '"' ){
        token = token.substring(1, token.length - 1);
    }
    try{
        jwt.verify(token, JWT_SECRET, (err, result) => {
            if (err) {
            return res.status(401).json({'message': 'what token is this?!'});
            }
            if( result.username === 'CNS-user' && result.password === 'CNS-password' ) {
                res.status(200).json({'message': 'LETS GOOOOO!'});
            }
            else{
                res.status(401).json({'message': 'bye'});
            }
        });
    }
    catch{
        return res.status(401).json({'message': 'bye'});
    }
}));

module.exports = router;

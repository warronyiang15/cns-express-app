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
}));

router.get('/', asyncMiddleware(async (req, res) => {
    //verify cookies
    console.log(req.body);
    console.log(req.headers);
    console.log(req.cookies)
    return res.status(200).json({'message': 'debug'});
}));

module.exports = router;

const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

const asyncMiddleware = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
};

/*
The 'Basic' HTTP Authentication
def index():
    f = open('code3a.conf', 'r')
    conf = f.read()
    if 'Basic' in conf:
        try:
            if request.headers.get('Authorization') == None:
                return construct_response("No authenticated credentials", 401, "text/html")
            Authorization = request.headers.get('Authorization')
            basic_header, encoded_credentials = Authorization.split(' ')
            if basic_header != 'Basic':
                return construct_response('Invalid Authorization Headers', 401, 'text/html')
            try:
                credentials = base64.b64decode(encoded_credentials).decode('utf-8')
                username, password = credentials.split(':')
                if username != 'CNS-user' or password != 'CNS-password':
                    return construct_response('Invalid credentials', 401, 'text/html')
                return construct_response('Good to go!', 200, 'text/html')
            except:
                return construct_response('Invalid credentials', 401, 'text/html')
        except:
            return construct_response('Invalid request', 401, 'text/html')
*/

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
/* 
Cookie-based authentication
*/
/*
router.post('/', asyncMiddleware(async (req, res) => {
    //set cookies
    if( !req.body.username || !req.body.password ){
        return res.status(401).json({'message': 'bye'});
    }
    const cookie = {
        'username': req.body.username,
        'password': req.body.password,
    };
    res.cookie(cookie).status(200).json({'message': 'free cookies'});
}));

router.get('/', asyncMiddleware(async (req, res) => {
    // get cookie
    if( req.cookie)
}));
*/
/*
JWT-based authentication
*/
//router.post('/', asyncMiddleware(async (req, res) => {
    //set cookies
//}));

//router.get('/', asyncMiddleware(async (req, res) => {
    //verify cookies
//}));
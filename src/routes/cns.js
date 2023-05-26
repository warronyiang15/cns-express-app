const express = require('express');
const router = express.Router();


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
    console.log(auth)
    return res.status(200).json({});
}));
module.exports = router;
/* 
Cookie-based authentication
*/
//router.post('/', asyncMiddleware(async (req, res) => {
    //set cookies
//}));

//router.get('/', asyncMiddleware(async (req, res) => {
    //verify cookies
//}));

/*
JWT-based authentication
*/
//router.post('/', asyncMiddleware(async (req, res) => {
    //set cookies
//}));

//router.get('/', asyncMiddleware(async (req, res) => {
    //verify cookies
//}));
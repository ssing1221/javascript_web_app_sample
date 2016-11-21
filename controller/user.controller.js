var config = require('../config.json');
var express = require('express');
var router = express.Router();
var gConstant = require('../gConstant.json');
var userService = require('../service/user.service');
var jwt = require('jsonwebtoken');
var request = require('request');

// routes
router.post('/getRecaptchaResp/:response', getRecaptchaResp);
router.post('/isAuthenticate', isAuthenticate);
router.post('/authenticateUser', authenticateUser);
router.get('/current', getCurrentUser);
router.post('/userlogOut', userlogOut);

function getRecaptchaResp(req, res) {
	
	var verificationUrl = config.recaptchaUrl + "?secret=" + config.recaptchaSecret 
							+ "&response=" + req.params.response + "&remoteip=" + req.connection.remoteAddress;
	
	request(verificationUrl, function (error, resRecap, body) {
		body = JSON.parse(body);
		if(body.success !== undefined && !body.success) {
			res.send(false);
		}else{
			res.send(true);
		}
	});
}

function isAuthenticate(req, res) {
	
	 // console.log('verify req.session.token:
		// '+JSON.stringify(jwt.verify(req.session.token, config.secret)));
	
	 if (req.session.token) {
         res.send({ isAuth: true });
     } else {
     	res.send({ isAuth: false });
     }

}
	
function authenticateUser(req, res) {

    userService.authenticate(req.body.username, req.body.encrypw)
        .then(function (token) {
            if (token) {
            	req.session.token = token;
                // authentication successful
                res.send({ token: token });
            } else {
                // authentication failed
                res.sendStatus(401);
            }
        })
        .catch(function (err) {
        	res.status(400).send(err);
        });
}

function getCurrentUser(req, res) {
    userService.getById(req.user.sub)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function userlogOut(req, res) {
    // log user out
    delete req.session.token;
    
    res.sendStatus(201);
}


module.exports = router;
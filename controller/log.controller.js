var config = require('../config.json');
var express = require('express');
var router = express.Router();
var gConstant = require('../gConstant.json');
var logService = require('../service/log.service');
var moment = require('moment-timezone');

// routes
router.post('/visitLog', visitLog);
router.get('/getTotVisit', getTotVisit);



function visitLog(req, res) {

	var date = new Date();
	
	var visitLogOjb = {'ip':req.connection.remoteAddress, 'visit_date': moment().tz("Asia/Hong_Kong").format()};
	
    logService.visitLog(visitLogOjb)
    .then(function () {
         res.sendStatus(201);
    })
    .catch(function (err) {
    	res.status(400).send(err);
    });
}

function getTotVisit(req, res) {
	logService.getTotVisit()
        .then(function (totNum) {
            if (totNum) {
                res.send({count :totNum});
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
	


module.exports = router;
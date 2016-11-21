var config = require('../config.json');
var gConstant = require('../gConstant.json');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, {
	native_parser : true
});
db.bind('logs');

var service = {};

service.visitLog = visitLog;
service.getTotVisit = getTotVisit;

module.exports = service;



function visitLog(visitLogOjb) {
	var deferred = Q.defer();

	db.logs.insert(visitLogOjb, function(err, doc) {
		if (err)
			deferred.reject(err);

		deferred.resolve();
	});

	return deferred.promise;
}

function getTotVisit() {
	var deferred = Q.defer();

	db.logs.count(function(err, totNum) {
		if (err)
			deferred.reject(err);

		if (totNum) {
			// found
			deferred.resolve(totNum);
		} else {
			// not found
			deferred.resolve();
		}

	});
	
	return deferred.promise;
}
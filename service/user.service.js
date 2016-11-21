var config = require('../config.json');
var gConstant = require('../gConstant.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, {
	native_parser : true
});
db.bind('users');

var service = {};

service.authenticate = authenticate;
service.getById = getById;

module.exports = service;

function authenticate(username, password) {
	var deferred = Q.defer();

	db.users.findOne({
		username : username,
		status : gConstant.g_status_active
	}, function(err, user) {
		if (err)
			deferred.reject(err);

		if (user) {
			if(user.try > gConstant.g_max_try){
				// account locked
				err = gConstant.g_locked;
				deferred.reject(err);
			}else{
				if (bcrypt.compareSync(password, user.encrypw)) {
					
					// reset the try counter
					db.users.update(
							   { _id: user._id },
							   { $set:
							      {
								   try: 0
							      }
							   }
							);
					
					
					// authentication successful
					deferred.resolve(jwt.sign({
						id : user._id
					}, config.secret));
					
				} else {
					// authentication failed
					deferred.resolve();
					db.users.update(
							   { _id: user._id },
							   { $inc: { try: 1} }
							);
				}
			}
		} else {
			// authentication failed
			deferred.resolve();
		}
		
	});

	return deferred.promise;
}

function getById(_id) {
	var deferred = Q.defer();

	db.users.findById(_id, function(err, user) {
		if (err)
			deferred.reject(err);

		if (user) {
			// return user (without hashed password)
			deferred.resolve(_.omit(user, 'encrypw'));
		} else {
			// user not found
			deferred.resolve();
		}
	});

	return deferred.promise;
}
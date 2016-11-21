var config = require('../config.json');
var gConstant = require('../gConstant.json');
var _ = require('lodash');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, {
	native_parser : true
});
db.bind('entries');

var service = {};

service.getRandomEntry = getRandomEntry;
service.getActiveEntryCount = getActiveEntryCount;
service.getEntryByCat = getEntryByCat;
service.getEntryAll = getEntryAll;
service.createEntry = createEntry;
service.updateEntry = updateEntry;
service.getSearchEntry = getSearchEntry;
service.getPendingEntry = getPendingEntry;
service.approvalAllEntry = approvalAllEntry;
service.approvalEntry = approvalEntry;
service.rejectEntry = rejectEntry;

module.exports = service;

function getRandomEntry() {
	var deferred = Q.defer();

	db.entries.count(function(err) {
		if (err)
			deferred.reject(err);

		db.entries.find({
			random : {
				$gt : Math.random()
			},
			status : gConstant.g_status_success
		}).sort({
			random : 1
		}).limit(1).toArray(function(err, entries) {
			if (err)
				deferred.reject(err);

			if (entries) {
				// found
				deferred.resolve(entries);
			} else {
				// not found
				deferred.resolve();
			}
		});

	});

	return deferred.promise;
}

function getActiveEntryCount() {
	var deferred = Q.defer();

	db.entries.find({
		status : gConstant.g_status_success
	}).count(function(err, totNum) {
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

function getEntryByCat(category, pageNum) {
	var deferred = Q.defer();

	db.entries.find({
		category : category,
		status : gConstant.g_status_success
	}).sort( { creDttm: -1 } ).skip(gConstant.g_entryPerPage * (pageNum - 1)).limit(
			gConstant.g_entryPerPage).toArray(function(err, entries) {
		if (err)
			deferred.reject(err);

		if (entries) {
			// found
			deferred.resolve(entries);
		} else {
			// not found
			deferred.resolve();
		}
	});

	return deferred.promise;
}

function getEntryAll(pageNum) {
	var deferred = Q.defer();

	db.entries.find({
		status : gConstant.g_status_success
	}).sort( { creDttm: -1 } ).skip(gConstant.g_entryPerPage * (pageNum - 1)).limit(
			gConstant.g_entryPerPage).toArray(function(err, entries) {
		if (err)
			deferred.reject(err);

		if (entries) {
			// found
			deferred.resolve(entries);
		} else {
			// not found
			deferred.resolve();
		}
	});

	return deferred.promise;
}

function createEntry(inputEntry) {
	var deferred = Q.defer();

	db.entries.insert(inputEntry, function(err, doc) {
		if (err)
			deferred.reject(err);

		deferred.resolve();
	});

	return deferred.promise;
}

function updateEntry(inputEntry) {
	var deferred = Q.defer();

	var ObjectId = require('mongodb').ObjectID;
	db.entries.update(

			 { _id: ObjectId(inputEntry._id) },
			   {
			     $set: {
			    	 content: inputEntry.content,
			    	 source: inputEntry.source,
			    	 tags: inputEntry.tags,
			     }
			   }
	
			, function(err, doc) {
		if (err)
			deferred.reject(err);

		deferred.resolve();
	});

	return deferred.promise;
}

function getSearchEntry(pageNum, inputEntry) {
	var deferred = Q.defer();
	
	if (inputEntry.content != null && inputEntry.content != '') {

		if (inputEntry.tag != null && inputEntry.tag != '') {
			inputEntry.tag = inputEntry.tag.toLowerCase();
			var query = {
				content : new RegExp('.*' + inputEntry.content + '.*', 'i'),
				tags : {
					$all : [ {
						text : '#' + inputEntry.tag
					} ]
				},
				status : gConstant.g_status_success
			};

		} else {
			var query = {
				content : new RegExp('.*' + inputEntry.content + '.*', 'i'),
				status : gConstant.g_status_success
			};
		}
	} else {
		inputEntry.tag = inputEntry.tag.toLowerCase();
		var query = {
			tags : {
				$all : [ {
					text : '#' + inputEntry.tag
				} ]
			},
			status : gConstant.g_status_success
		};
	}

	db.entries.find(query).sort( { creDttm: -1 } ).skip(gConstant.g_entryPerPage * (pageNum - 1))
			.limit(gConstant.g_entryPerPage).toArray(function(err, entries) {
				if (err)
					deferred.reject(err);

				if (entries) {
					// found
					deferred.resolve(entries);
				} else {
					// not found
					deferred.resolve();
				}
			});

	return deferred.promise;
}

function getPendingEntry() {
	var deferred = Q.defer();

	db.entries.find({
		status : gConstant.g_status_pending
	}).sort( { creDttm: -1 } ).toArray(function(err, entries) {
		if (err)
			deferred.reject(err);

		if (entries) {
			// found
			deferred.resolve(entries);
		} else {
			// not found
			deferred.resolve();
		}
	});

	return deferred.promise;
}

function approvalAllEntry() {
	var deferred = Q.defer();

	db.entries.updateMany({
		"status" : gConstant.g_status_pending
	}, {
		$set : {
			"status" : gConstant.g_status_success
		}
	}, function(err, results) {
		if (err)
			deferred.reject(err);

		deferred.resolve();
	});

	return deferred.promise;
}

function approvalEntry(id) {
	var deferred = Q.defer();

	db.entries.updateOne({
		"_id" : mongo.ObjectID(id)
	}, {
		$set : {
			"status" : gConstant.g_status_success
		}
	}, function(err, results) {
		if (err)
			deferred.reject(err);

		deferred.resolve();
	});

	return deferred.promise;
}

function rejectEntry(id) {
	var deferred = Q.defer();

	db.entries.updateOne({
		"_id" : mongo.ObjectID(id)
	}, {
		$set : {
			"status" : gConstant.g_status_delete
		}
	}, function(err, results) {
		if (err)
			deferred.reject(err);

		deferred.resolve();
	});

	return deferred.promise;
}
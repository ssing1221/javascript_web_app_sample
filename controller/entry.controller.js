var express = require('express');
var router = express.Router();
var gConstant = require('../gConstant.json');
var entryService = require('../service/entry.service');
var moment = require('moment-timezone');

// routes
router.get('/getEntry/random', getRandomEntry);
router.get('/getActiveEntryCount', getActiveEntryCount);
router.get('/getEntry/byCat/:cat/:page', getEntryByCat);
router.get('/getEntry/all/:page', getEntryAll);
router.post('/createEntry', createEntry);
router.post('/updateEntry', updateEntry);
router.post('/getSearchEntry/:page', getSearchEntry);
router.post('/getPendingEntry/', getPendingEntry);
router.post('/approvalAllEntry/', approvalAllEntry);
router.post('/approvalEntry/:id', approvalEntry);
router.post('/rejectEntry/:id', rejectEntry);

function getRandomEntry(req, res) {
	entryService.getRandomEntry()
        .then(function (entries) {
            if (entries) {
                res.send(entries);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getActiveEntryCount(req, res) {
	entryService.getActiveEntryCount()
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

function getEntryByCat(req, res) {
	entryService.getEntryByCat(req.params.cat, req.params.page)
        .then(function (entries) {
            if (entries) {
                res.send(entries);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getEntryAll(req, res) {
	entryService.getEntryAll(req.params.page)
        .then(function (entries) {
            if (entries) {
                res.send(entries);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function createEntry(req, res) {
	var inputEntry = req.body;
	
	// Replace /u0000 to emtyp string
	inputEntry.content = inputEntry.content.replace(/\u0000/g, "");
	
	inputEntry.source = inputEntry.source.replace(/\u0000/g, "");
	
	// Add # to tags and change to lowercase
	var tag = inputEntry.tags;

	for(var i in tag)
	{
		tag[i].text = "#"+tag[i].text.toLowerCase().replace(/\u0000/g, "");
	}
	
	inputEntry.random = Math.random();
	inputEntry.status = gConstant.g_status_pending;
	inputEntry.creDttm =  moment().tz("Asia/Hong_Kong").format();
	entryService.createEntry(inputEntry)
        .then(function () {
            res.sendStatus(201);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function updateEntry(req, res) {
	var inputEntry = req.body;
	
	// Replace /u0000 to emtyp string
	inputEntry.content = inputEntry.content.replace(/\u0000/g, "");
	
	inputEntry.source = inputEntry.source.replace(/\u0000/g, "");
	
	// Add # to tags and change to lowercase
	var tag = inputEntry.tags;

	for(var i in tag)
	{
		if(tag[i].text != ''){
			if(tag[i].text.charAt(0) != '#'){
				tag[i].text = "#"+tag[i].text;
			}
		}
		tag[i].text = tag[i].text.toLowerCase().replace(/\u0000/g, "");
	}
	
	entryService.updateEntry(inputEntry)
        .then(function () {
            res.sendStatus(201);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function getSearchEntry(req, res) {
	var inputEntry = req.body;
	
	// Replace /u0000 to emtyp string
	if (inputEntry.content != null) {
		inputEntry.content = inputEntry.content.replace(/\u0000/g, "");
	}
	
	if (inputEntry.tag != null) {
		inputEntry.tag = inputEntry.tag.replace(/\u0000/g, "");
	}

	entryService.getSearchEntry(req.params.page, inputEntry)
        .then(function (entries) {
            if (entries) {
                res.send(entries);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getPendingEntry(req, res) {
	entryService.getPendingEntry()
        .then(function (entries) {
            if (entries) {
                res.send(entries);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function approvalAllEntry(req, res) {
	entryService.approvalAllEntry()
        .then(function () {
        	 res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function approvalEntry(req, res) {
	entryService.approvalEntry(req.params.id)
        .then(function () {
        	 res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function rejectEntry(req, res) {
	entryService.rejectEntry(req.params.id)
        .then(function () {
        	 res.sendStatus(200);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


module.exports = router;


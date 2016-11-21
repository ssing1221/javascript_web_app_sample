(function() {
	'use strict';

	angular.module('mainModule').factory('entryService', entryService);
	// entryService refer to main.controller.js: function mainCtrl(entryService)
	// { .......

	function entryService($http, $q) {
		var service = {};

		// Set entry function in service
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

		return service;

		function getRandomEntry() {
			return $http.get('/entryAPI/getEntry/random').then(handleSuccess, handleError);
		}
		
		function getActiveEntryCount() {
			return $http.get('/entryAPI/getActiveEntryCount').then(handleSuccess, handleError);
		}
		
		function getEntryByCat(cat, page) {
			return $http.get('/entryAPI/getEntry/byCat/' + cat + '/' + page).then(handleSuccess, handleError);
		}

		function getEntryAll(page) {
			return $http.get('/entryAPI/getEntry/all/' + page).then(handleSuccess, handleError);
		}

		function createEntry(inputEntry) {
			return $http.post('/entryAPI/createEntry/', inputEntry).then(handleSuccess, handleError);
		}
		
		function updateEntry(inputEntry) {
			return $http.post('/entryAPI/updateEntry/', inputEntry).then(handleSuccess, handleError);
		}
		
		function getSearchEntry(page, inputEntry) {
			return $http.post('/entryAPI/getSearchEntry/' + page , inputEntry).then(handleSuccess, handleError);
		}
		
		function getPendingEntry() {
			return $http.post('/entryAPI/getPendingEntry/').then(handleSuccess, handleError);
		}
		
		function approvalAllEntry() {
			return $http.post('/entryAPI/approvalAllEntry/').then(handleSuccess, handleError);
		}
		
		function approvalEntry(id) {
			return $http.post('/entryAPI/approvalEntry/' + id).then(handleSuccess, handleError);
		}
		
		function rejectEntry(id) {
			return $http.post('/entryAPI/rejectEntry/' + id).then(handleSuccess, handleError);
		}

		// private functions

		function handleSuccess(res) {
			return res.data;
		}

		function handleError(res) {
			return $q.reject(res.data);
		}
	}

})();

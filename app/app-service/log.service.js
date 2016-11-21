(function() {
	'use strict';

	angular.module('mainModule').factory('logService', logService);
	// logService refer to login.controller.js: function logCtrl(logService)
	// { .......

	function logService($http, $q) {
		var service = {};

		// Set log function in service
		service.visitLog = visitLog;
		service.getTotVisit = getTotVisit;

		return service;
		
		function visitLog() {
			return $http.post('/logAPI/visitLog/').then(handleSuccess, handleError);
		}
		
		function getTotVisit() {
			return $http.get('/logAPI/getTotVisit/').then(handleSuccess, handleError);
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

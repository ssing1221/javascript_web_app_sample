(function() {
	'use strict';

	angular.module('mainModule').factory('userService', userService);
	// userService refer to login.controller.js: function userCtrl(userService)
	// { .......

	function userService($http, $q) {
		var service = {};

		// Set user function in service
		service.getRecaptchaResp = getRecaptchaResp;
		service.isAuthenticate = isAuthenticate;
		service.authenticateUser = authenticateUser;
		service.getCurrentUser = getCurrentUser;
		service.userlogOut = userlogOut;

		return service;
		
		function getRecaptchaResp(response) {
			return $http.post('/userAPI/getRecaptchaResp/' + response).then(handleSuccess, handleError);
		}
		
		function isAuthenticate() {
			return $http.post('/userAPI/isAuthenticate/').then(handleSuccess, handleError);
		}
		
		function authenticateUser(user) {
			return $http.post('/userAPI/authenticateUser/', user).then(handleSuccess, handleError);
		}
		
		function getCurrentUser(user_id) {
			return $http.post('/userAPI/getCurrentUser/' + user_id).then(handleSuccess, handleError);
		}
		
		function userlogOut() {
			return $http.post('/userAPI/userlogOut/').then(handleSuccess, handleError);
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

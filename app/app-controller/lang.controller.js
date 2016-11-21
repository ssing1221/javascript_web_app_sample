(function() {
	'use strict';

	angular.module('mainModule').controller('langCtrl', langCtrl);

	function langCtrl($http, $rootScope) {

		initController();

		function initController() {
		}

		$rootScope.chgLang = function(inputLang) {
			if (inputLang == 'ZH') {
				var resultLang = $http.get('/app/app-content/lang/trans_zh.json');
			} else if (inputLang == 'EN') {
				var resultLang = $http.get('/app/app-content/lang/trans_en.json');
			}
			resultLang.success(function(data) {
				$rootScope.label = data;
			}).error(function(data, status, error, config) {
				$rootScope.label = [ {
					heading : "Error",
					description : "Could not load trans json data"
				} ];
			});
		}

	}

})();
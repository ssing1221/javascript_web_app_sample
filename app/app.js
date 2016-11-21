(function() {
	'use strict';

	angular.module('mainModule', [ 'ui.router', 'infinite-scroll', 'ngSanitize', 'ngMessages', 'ngTagsInput', 'blockUI', 'vcRecaptcha' ]).config(config).run(run);

	function config($stateProvider, $urlRouterProvider, blockUIConfig) {
		// default route
		$urlRouterProvider.otherwise('/');
		
		// Put in the first one to set the default page
		$stateProvider.state('main', {
			url : '/',
			templateUrl : 'main/main.html',
			controller : 'mainCtrl',
			controllerAs : 'vm'
		});
		
		$stateProvider.state('all', {
			url : '/',
			templateUrl : 'all/all.html',
			controller : 'allCtrl',
			controllerAs : 'vm'
		});
		
		$stateProvider.state('search', {
			url : '/',
			templateUrl : 'search/search.html',
			controller : 'searchCtrl',
			controllerAs : 'vm'
		});
		
		$stateProvider.state('under_con', {
			url : '/',
			templateUrl : 'under_con/under_con.html',
			controller : 'underConCtrl',
			controllerAs : 'vm'
		});

		$stateProvider.state('login', {
			url : '/',
			templateUrl : 'login/login.html',
			controller : 'loginCtrl',
			controllerAs : 'vm'
		});
		
		$stateProvider.state('pending', {
			url : '/',
			templateUrl : 'pending/pending.html',
			controller : 'pendingCtrl',
			controllerAs : 'vm'
		});
		
		// Change the default overlay message
		blockUIConfig.message = '';
		
		// Disable automatically blocking of the user interface
		blockUIConfig.autoBlock = false;
		
	}

	function run($http, $rootScope, $window) {
		$http.get('/app/app-content/lang/trans_en.json').success(function(data) {
			$rootScope.label = data;
		}).error(function(data, status, error, config) {
			$rootScope.label = [ {
				heading : "Error",
				description : "Could not load trans json data"
			} ];
		});

	}

})();
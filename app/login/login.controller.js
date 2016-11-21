(function() {
	'use strict';

	angular.module('mainModule').controller('loginCtrl', loginCtrl);

	function loginCtrl(userService, $scope, $rootScope, $state, blockUI) {

		var vm = this;

		vm.user = null;
		vm.alerts = null;
		
		vm.loginRecaptchaResp = null;
		vm.recaptcha_public_key = g_recaptcha_public_key;

		initController();

		function initController() {
			// Block the user interface
			blockUI.start();
			
			vm.user = null;
			vm.alerts = null;
			
			vm.loginRecaptchaResp = null;
			grecaptcha.reset();

			userService.isAuthenticate().then(function(result) {
				if(result.isAuth){
					$state.go('pending');
				}
				
				// Unblock the user interface
                blockUI.stop();
			});
		}
		;

		vm.userLogin = userLogin;
		function userLogin() {
			// Block the user interface
			blockUI.start();
			
			userService.getRecaptchaResp(vm.loginRecaptchaResp).then(function(isPass) {
				if(isPass){
					userService.authenticateUser(vm.user).then(function(token) {
						$state.go('pending');
						vm.loginRecaptchaResp = null;
						grecaptcha.reset();
						// Unblock the user interface
		                blockUI.stop();
					}).catch(function (error) {
						if (error === 'locked'){
							vm.alerts = [{ type: g_alert_type_d, msg: $rootScope.label.ACCOUNT_LOCKED }];
						}else if (error === 'Unauthorized'){
							vm.alerts = [{ type: g_alert_type_d, msg: $rootScope.label.USERNAME_PASSWORD_INCORRECT }];
						}else{
							vm.alerts = [{ type: g_alert_type_d, msg: $rootScope.label.OOPS }];
						}
						vm.loginRecaptchaResp = null;
						grecaptcha.reset();
						// Unblock the user interface
		                blockUI.stop();
		            });
				}else{
					vm.alerts = [{ type: g_alert_type_d, msg: $rootScope.label.OOPS }];
					vm.loginRecaptchaResp = null;
					grecaptcha.reset();
					// Unblock the user interface
	                blockUI.stop();
				}
			}).catch(function (error) {
				vm.alerts = [{ type: g_alert_type_d, msg: $rootScope.label.OOPS }];
				vm.loginRecaptchaResp = null;
				grecaptcha.reset();
				// Unblock the user interface
                blockUI.stop();
			});
		}
		
		vm.clearLoginForm = clearLoginForm;
		function clearLoginForm() {
			// Block the user interface
			blockUI.start();
			
			vm.user = null;
			vm.alerts = null;
			
			vm.loginRecaptchaResp = null;
			grecaptcha.reset();
			
			// Unblock the user interface
            blockUI.stop();
		}
		;

	}

})();
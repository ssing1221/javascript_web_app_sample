(function() {
	'use strict';

	angular.module('mainModule').controller('pendingCtrl', pendingCtrl);

	function pendingCtrl(userService, entryService, logService, $scope, $rootScope, $state, blockUI) {

		var vm = this;

		vm.totNum = null;
		vm.pendingEntries = null;
		vm.isAuth = false;

		initController();

		function initController() {
			
			// Block the user interface
			blockUI.start();
			
			reset();
			
			userService.isAuthenticate().then(function(result) {
				vm.isAuth = result.isAuth;
				
				logService.getTotVisit().then(function(totNum) {
					if (totNum != null) {
						vm.totNum = totNum.count;
					}
				}).catch(function (error) {
	            	vm.alerts = [{ type: g_alert_type_d, msg: $rootScope.label.OOPS }];
	            	// Unblock the user interface
                    blockUI.stop();
	            });
				
				entryService.getPendingEntry().then(function(entries) {
					if (Object.keys(entries).length != 0) {
						for (var i = 0; i < Object.keys(entries).length; i++) {
							entries[i].content = convertToHTMLVisibleNewline(entries[i].content);
							entries[i].content = entries[i].content;
						}
						vm.pendingEntries = entries;
					}
					// Unblock the user interface
                    blockUI.stop();
				});
			});
		}
		;
		
		vm.approvalAllEntry = approvalAllEntry;
		function approvalAllEntry() {
			// Block the user interface
			blockUI.start();
			
			entryService.approvalAllEntry().then(function() {
				
				vm.pendingEntries = null;
				
				// Unblock the user interface
                blockUI.stop();
			}).catch(function (error) {
            	vm.alerts = [{ type: g_alert_type_d, msg: $rootScope.label.OOPS }];
            	// Unblock the user interface
                blockUI.stop();
            });
			
		}
		;
		
		vm.approvalEntry = approvalEntry;
		function approvalEntry(entry) {
			// Block the user interface
			blockUI.start();
			
			entryService.approvalEntry(entry._id).then(function() {
				
				findAndRemove(vm.pendingEntries, '_id', entry._id);
				
				// Unblock the user interface
                blockUI.stop();
			}).catch(function (error) {
            	vm.alerts = [{ type: g_alert_type_d, msg: $rootScope.label.OOPS }];
            	// Unblock the user interface
                blockUI.stop();
            });
			
		}
		;
		
		vm.rejectEntry = rejectEntry;
		function rejectEntry(entry) {
			// Block the user interface
			blockUI.start();
			
			entryService.rejectEntry(entry._id).then(function() {
				
				findAndRemove(vm.pendingEntries, '_id', entry._id);
				
				// Unblock the user interface
                blockUI.stop();
			}).catch(function (error) {
            	vm.alerts = [{ type: g_alert_type_d, msg: $rootScope.label.OOPS }];
            	// Unblock the user interface
                blockUI.stop();
            });
			
		}
		;
		
		vm.userLogout = userLogout;
		function userLogout() {
			// Block the user interface
			blockUI.start();
			
			userService.userlogOut().then(function() {
				$state.go('main');
            	// Unblock the user interface
                blockUI.stop();
			}).catch(function (error) {
            	vm.alerts = [{ type: g_alert_type_d, msg: $rootScope.label.OOPS }];
            	// Unblock the user interface
                blockUI.stop();
            });
			
		}
		;
		
		function reset() {
			vm.pendingEntries = null;
			vm.isAuth = false;
			vm.alerts = null;
		}
	}

})();

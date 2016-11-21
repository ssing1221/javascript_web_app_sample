(function() {
	'use strict';

	angular.module('mainModule').controller('mainCtrl', mainCtrl);


	function mainCtrl(entryService, userService, logService, $scope, $rootScope, $location, $anchorScroll, blockUI) {

		var vm = this;

		vm.randomEntry = null;
		vm.totActiveEntry = null;
		vm.entries = null;
		vm.inputEntry = null;
		vm.alerts = null;
		vm.prevFlag = null;
		vm.nextFlag = null;
		vm.prevEntry = null;
		vm.nextEntry = null;
		vm.noPrevEntry = {"content": g_no_previose_entry, "source": g_jym_motto, "tags" : [{"text": "#" + g_jym_motto}]};
		
		vm.isAuth = false;
		
		vm.loginRecaptchaResp = null;
		vm.recaptcha_public_key = g_recaptcha_public_key;

		initController();

		function initController() {
			
			// Block the user interface
			blockUI.start();
			
			// Set previous and next
			vm.prevFlag = false;
			vm.nextFlag = false;
			vm.prevEntry = false;
			vm.nextEntry = false;
			
			userService.isAuthenticate().then(function(result) {
				vm.isAuth = result.isAuth;
			});
			
			logService.visitLog().then(function() {
				
				entryService.getActiveEntryCount().then(function(totActiveEntry) {
					
					if(totActiveEntry != null){
						vm.totActiveEntry = totActiveEntry.count;
					}

				}).catch(function (error) {
                	vm.alerts = [{ type: g_alert_type_d, msg: $rootScope.label.OOPS }];
                	// Unblock the user interface
                    blockUI.stop();
                });
				
				entryService.getRandomEntry().then(function(entries) {
					
					if(entries[0] != null){
						entries[0].content = convertToHTMLVisibleNewline(entries[0].content);
						vm.randomEntry = entries[0];
					}
					
					// Unblock the user interface
                    blockUI.stop();
                    
				}).catch(function (error) {
                	vm.alerts = [{ type: g_alert_type_d, msg: $rootScope.label.OOPS }];
                	// Unblock the user interface
                    blockUI.stop();
                });
				
			}).catch(function (error) {
            	vm.alerts = [{ type: g_alert_type_d, msg: $rootScope.label.OOPS }];
            	// Unblock the user interface
                blockUI.stop();
            });
			

		}
		;


		vm.getRandomEntry = getRandomEntry;
		function getRandomEntry() {
			// Block the user interface
			blockUI.start();
			
			// Set previous flag to false
			vm.prevFlag = false;
			
			if(vm.nextFlag){
				// Set next entry to random entry 
				vm.randomEntry = vm.nextEntry;
				vm.nextFlag = false;
				
            	// Unblock the user interface
                blockUI.stop();
				return;
			}
			
			// Set previous entry
			vm.prevEntry = vm.randomEntry;
			
			entryService.getRandomEntry().then(function(entries) {
				
				if(entries[0] != null){
					entries[0].content = convertToHTMLVisibleNewline(entries[0].content);
					vm.randomEntry = entries[0];
				}

				// Unblock the user interface
                blockUI.stop();
			}).catch(function (error) {
            	vm.alerts = [{ type: g_alert_type_d, msg: $rootScope.label.OOPS }];
            	// Unblock the user interface
                blockUI.stop();
            });
			
		}
		;
		
		vm.getPrevEntry = getPrevEntry;
		function getPrevEntry() {
			// Block the user interface
			blockUI.start();
			
			if(vm.prevFlag){
				// Set no previous entry
				vm.randomEntry = vm.noPrevEntry;
				
            	// Unblock the user interface
                blockUI.stop();
				return;
			}
	
			// Set next entry
			vm.nextEntry = vm.randomEntry;

			// Set previous entry to random entry
			vm.randomEntry = vm.prevEntry;
			
			// Set next flag to true
			vm.nextFlag = true;
			
			// Set previous flag to true
			vm.prevFlag = true;
			
        	// Unblock the user interface
            blockUI.stop();
			
		}
		;

		vm.loadMoreEntryAll = loadMoreEntryAll;
		function loadMoreEntryAll() {
			if (vm.entries != null) {

				var page = ((Object.keys(vm.entries).length) / g_entryPerPage) + 1;

				entryService.getEntryAll(page).then(function(entries) {
					for (var i = 0; i < Object.keys(entries).length; i++) {
						vm.entries.push(entries[i]);
					}
				});
			}
		}
		;
		
		vm.createEntry = createEntry;
		function createEntry() {
			
			if (vm.inputEntry != null) {
				
				// Block the user interface
				blockUI.start();
				
				if(!vm.isAuth){
					userService.getRecaptchaResp(vm.loginRecaptchaResp).then(function(isPass) {
						if(isPass){
							entryService.createEntry(vm.inputEntry)
			                .then(function () {
			                	vm.inputEntry = null;
			                	vm.alerts = [{ type: g_alert_type_s, msg: $rootScope.label.SUCCESSFULLY_POSTED }];
			                	vm.loginRecaptchaResp = null;
								grecaptcha.reset();
			                	// Unblock the user interface
			                    blockUI.stop();
			                })
			                .catch(function (error) {
			                	vm.alerts = [{ type: g_alert_type_d, msg: $rootScope.label.OOPS }];
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
					});
				}else{
					
					entryService.createEntry(vm.inputEntry)
	                .then(function () {
	                	vm.inputEntry = null;
	                	vm.alerts = [{ type: g_alert_type_s, msg: $rootScope.label.SUCCESSFULLY_POSTED }];
	                	vm.loginRecaptchaResp = null;
						grecaptcha.reset();
	                	// Unblock the user interface
	                    blockUI.stop();
	                })
	                .catch(function (error) {
	                	vm.alerts = [{ type: g_alert_type_d, msg: $rootScope.label.OOPS }];
	                	vm.loginRecaptchaResp = null;
						grecaptcha.reset();
	                	// Unblock the user interface
	                    blockUI.stop();
	                });
				}
			}
		}
		;

		vm.clearPostEntryForm = clearPostEntryForm;
		function clearPostEntryForm() {
			vm.inputEntry = null;
			vm.alerts = null;
			vm.loginRecaptchaResp = null;
			grecaptcha.reset();
		}
		;
		
		


	}

})();
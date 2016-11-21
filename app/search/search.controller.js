(function() {
	'use strict';

	angular.module('mainModule').controller('searchCtrl', searchCtrl);

	function searchCtrl(userService, entryService, $scope, $rootScope, blockUI) {

		var vm = this;

		vm.entries = null;
		vm.inputEntry = null;
		
		vm.disableSearch = false;
		vm.disableLoadMore = false;
		vm.loadMoreEnd = false;
		vm.isAuth = false;

		initController();

		function initController() {
			
			// Block the user interface
			blockUI.start();
			
			clearSearchEntryForm();
			
			userService.isAuthenticate().then(function(result) {
				vm.isAuth = result.isAuth;
			});
			
        	// Unblock the user interface
            blockUI.stop();
		}
		;
		
		function initSearch() {
			vm.entries = null;
			vm.disableLoadMore = false;
			vm.alerts = null;
		}
		;
		
		vm.searchEntry = searchEntry;
		function searchEntry() {
			// Block the user interface
			blockUI.start();
			
			initSearch();
			
			if (vm.inputEntry != null) {
				
				if(vm.inputEntry.content == null && vm.inputEntry.tag == null){
					
					vm.alerts = [{ type: g_alert_type_d, msg: $rootScope.label.ENTER_WORD_OR_TAG }];
				};
			
				entryService.getSearchEntry(g_initPage, vm.inputEntry).then(function (entries) {
					if (Object.keys(entries).length != 0 && !vm.disableLoadMore) {
						
						vm.disableSearch = true;
						
						for (var i = 0; i < Object.keys(entries).length; i++) {
							entries[i].content = convertToHTMLVisibleNewline(entries[i].content);
						}
						
						vm.entries = entries;
						
						// Highlight the search keyword
						setTimeout(function() {
							var markInstance = new Mark(document.querySelector("#resultSect"));
							markInstance.unmark().mark(vm.inputEntry.content);
						}, 250);
						
					} else {
						vm.disableLoadMore = true;
						vm.loadMoreEnd = true;
						vm.alerts = [{ type: g_alert_type_i, msg: $rootScope.label.NOT_FOUND }];
					};
					// Unblock the user interface
                    blockUI.stop();
                }).catch(function (error) { vm.alerts = [{ type: g_alert_type_d, msg: $rootScope.label.OOPS }];
		             // Unblock the user interface
		             blockUI.stop();
                });
			}else{
				// Unblock the user interface
                blockUI.stop();
			}
			
		}
		;
		
		vm.searchByTag = searchByTag;
		function searchByTag(tag) {
			vm.inputEntry =  {"tag": tag};
			searchEntry();
		}
		;

		vm.loadMoreSearchEntry = loadMoreSearchEntry;
		function loadMoreSearchEntry() {
			if(vm.disableLoadMore){
				return;
			}
			if (vm.entries != null && !vm.disableLoadMore) {
				if((Object.keys(vm.entries).length) < g_entryPerPage){
					vm.disableLoadMore = true;
					vm.loadMoreEnd = true;
				}else{
					var page = ((Object.keys(vm.entries).length) / g_entryPerPage) + 1;
					vm.disableLoadMore = true;
					entryService.getSearchEntry(page, vm.inputEntry).then(function(entries) {
						if (Object.keys(entries).length != 0) {
							for (var i = 0; i < Object.keys(entries).length; i++) {
								entries[i].content = convertToHTMLVisibleNewline(entries[i].content);
								vm.entries.push(entries[i]);
							}
							vm.disableLoadMore = false;
							
							// Highlight the search keyword
							setTimeout(function() {
								var markInstance = new Mark(document.querySelector("#resultSect"));
								markInstance.unmark().mark(vm.inputEntry.content);
							}, 250);
							
						} else {
							vm.disableLoadMore = true;
							vm.loadMoreEnd = true;
						}
					});
				}
			}
		}
		;
		
		vm.clearSearchEntryForm = clearSearchEntryForm;
		function clearSearchEntryForm() {
			vm.entries = null;
			vm.inputEntry = null;
			vm.alerts = null;
			
			vm.disableSearch = false;
			vm.disableLoadMore = false;
			vm.loadMoreEnd = false;
		}
		;
		
		vm.updateEntry = updateEntry;
		function updateEntry(inputEntry) {
	
			if (inputEntry != null) {
				
				// Block the user interface
				blockUI.start();
				
				entryService.updateEntry(inputEntry)
	                .then(function () {
	                	
	                	// Unblock the user interface
	                    blockUI.stop();
	                })
	                .catch(function (error) {
	                	vm.alerts = [{ type: g_alert_type_d, msg: $rootScope.label.OOPS }];
	                	
	                	// Unblock the user interface
	                    blockUI.stop();
	                });
				
			}
			
		}
		;

	}

})();

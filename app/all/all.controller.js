(function() {
	'use strict';

	angular.module('mainModule').controller('allCtrl', allCtrl);

	function allCtrl(entryService, $scope, blockUI) {

		var vm = this;

		vm.entries = null;
		vm.disableLoadMore = false;
		vm.loadMoreEnd = false;

		initController();

		function initController() {
			
			vm.disableLoadMore = false;
			vm.loadMoreEnd = false;
			
			entryService.getEntryAll(g_initPage).then(function(entries) {
				for (var i = 0; i < Object.keys(entries).length; i++) {
					entries[i].content = convertToHTMLVisibleNewline(entries[i].content);
					entries[i].content = entries[i].content;
				}
				vm.entries = entries;
			});
		}
		;

		vm.loadMoreEntryAll = loadMoreEntryAll;
		function loadMoreEntryAll() {
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
					entryService.getEntryAll(page).then(function(entries) {
						if (Object.keys(entries).length != 0) {
							for (var i = 0; i < Object.keys(entries).length; i++) {
								entries[i].content = convertToHTMLVisibleNewline(entries[i].content);
								vm.entries.push(entries[i]);
								vm.disableLoadMore = false;
							}
						} else {
							vm.disableLoadMore = true;
							vm.loadMoreEnd = true;
						}
					});
				}
			}
		}
		;

	}

})();

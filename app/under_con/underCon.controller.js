(function() {
	'use strict';

	angular.module('mainModule').controller('underConCtrl', underConCtrl);

	function underConCtrl(entryService, $scope, blockUI) {

		var vm = this;

		vm.randomEntry = null;
		vm.entries = null;
		var entryPerPage = 3;

		initController();

		function initController() {
			entryService.getRandomEntry().then(function(entries) {
				entries[0].content = convertToHTMLVisibleNewline(entries[0].content);
				vm.randomEntry = entries[0];
			});
		}
		;

	}

})();
'use strict';

angular.module('groupByDemo.settings', ['ui.bootstrap'])
	.controller('settingsCtrl', ['$uibModal', 'settingsService',
		function ($uibModal, settingsService) {

		var vm = this;

		vm.sections = settingsService;

		vm.dragControlListeners = {
		    accept: function (sourceItemHandleScope, destSortableScope) { return true; }, //override to determine drag is allowed or not. default is true.
		    itemMoved: function (event) {} ,
		    orderChanged: function(event) {}
		};

		vm.open = function(sections){
			console.log("opening modal");
			var modalInstance = $uibModal.open({
			  animation: true,
			  templateUrl: "/settings/settings.tpl.html",
			  controller: "settingsModalCtrl as settings",
			  size: "lg",
			  windowClass : "settings-modal",
			  resolve : {
			  	sections : function () { return sections; }
			  }
			});
		};


	}]).controller('settingsModalCtrl', ['$uibModalInstance', 'sections', 
		function($uibModalInstance, sections){

			var vm = this;
			vm.sections = sections;

			vm.done = function() {
				$uibModalInstance.dismiss('cancel');
			};

			console.log(vm);

	}]);
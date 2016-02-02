'use strict';

angular.module('groupByDemo.settings', ['ui.bootstrap'])
	.controller('settingsCtrl', ['$uibModal',
		function ($uibModal) {

		var vm = this;

		vm.sections = {};
		vm.sections['Primary Nav'] = {
			"New Arrivals" : "field name",
			"Home" : "field name",
			"Women" : "field name",
			"Men" : "field name"
		};
		vm.sections['Color Mapping'] = {
			"Red" : "#F00",
			"Green" : "#F00",
			"Blue" : "#F00"
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
		}


	}]).controller('settingsModalCtrl', ['$uibModalInstance', 'sections', 
		function($uibModalInstance, sections){

			var vm = this;
			vm.sections = sections;

			vm.done = function() {
				$uibModalInstance.dismiss('cancel');
			}

			console.log(vm);

	}]);
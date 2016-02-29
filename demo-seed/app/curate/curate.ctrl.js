'use strict';

angular.module('groupByDemo.curate', ['ui.bootstrap'])
	.controller('curateCtrl', ['apiService', 'settingsService', '$uibModalInstance', 'id', 'position',
		function(apiService, settingsService, $uibModalInstance, id, position){

			var vm = this;
			vm.id = id;
			vm.position = position;
			vm.moveto = position;
			vm.searchText = "";
			vm.results = [];
			vm.displayFields = settingsService['Display Fields'];

			vm.search = function () {

				var parameters = {
					skip : 0,
					pageSize : 12,
					query : vm.searchText,
					fields: settingsService.search.fields
				};

				apiService.search(parameters).then(function(response){
					vm.results = response.data.records;
				});
			};

			vm.save = function() {

				$uibModalInstance.dismiss('cancel');
			};

			vm.cancel = function() {
				$uibModalInstance.dismiss('cancel');
			};

			console.log(vm);

	}]);
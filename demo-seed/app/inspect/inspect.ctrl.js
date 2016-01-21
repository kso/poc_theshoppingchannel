'use strict';

angular.module('groupByDemo.inspect', ['ui.bootstrap'])
	.controller('inspectCtrl', ['apiService', '$uibModalInstance', 'id',
		function(apiService, $uibModalInstance, id){

			var vm = this;
			vm.id = id;

			apiService.getProduct(id).success(function(data){
				console.log(data.records[0]);
				vm.record = data.records[0];
			});

			vm.done = function() {
				$uibModalInstance.dismiss('cancel');
			}

			console.log(vm);

	}]);
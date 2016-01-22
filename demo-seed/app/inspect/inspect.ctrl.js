'use strict';

angular.module('groupByDemo.inspect', ['ui.bootstrap'])
	.controller('inspectCtrl', ['apiService', '$uibModalInstance', 'id',
		function(apiService, $uibModalInstance, id){

			var vm = this;
			vm.id = id;

			apiService.getProduct(id).then(function(record){
				console.log(record);
				vm.record = record;
			});

			vm.done = function() {
				$uibModalInstance.dismiss('cancel');
			}

			console.log(vm);

	}]);
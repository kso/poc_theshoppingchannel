'use strict';

angular.module('groupByDemo.product', ['ui.bootstrap'])
	.controller('productCtrl', ['$scope', 'apiService', '$routeParams', function($scope, apiService, $routeParams){
		$scope.productId = $routeParams.id;

		apiService.getProduct($scope.productId).success(function(data){
			console.log(data.records[0]);
			$scope.product = data.records[0];
		});

	}]);
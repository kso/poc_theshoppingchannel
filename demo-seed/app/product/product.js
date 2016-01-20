'use strict';

angular.module('groupByDemo.product', ['ui.bootstrap'])
	.controller('productCtrl', ['apiService', '$routeParams', function(apiService, $routeParams){
		
		var view_model = this;

		apiService.getProduct($routeParams.id).success(function(data){
			console.log(data.records[0]);
			view_model.meta = data.records[0].allMeta;
		});

	}]);
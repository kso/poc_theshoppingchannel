'use strict';

angular.module('groupByDemo.product', ['ui.bootstrap'])
	.controller('productCtrl', ['apiService', '$routeParams', function(apiService, $routeParams){
		
		var view_model = this;

		apiService.getProduct($routeParams.id).then(function(record){
			view_model.meta = record.allMeta;
		});

	}]);
'use strict';

angular.module('groupByDemo.product', ['ui.bootstrap'])
	.controller('productCtrl', ['apiService', '$stateParams', function(apiService, $stateParams){
		
		var view_model = this;

		apiService.getProduct($stateParams.id).then(function(record){
			view_model.meta = record.allMeta;

			//if color is not an array, convert to array
			if(!Array.isArray(record.allMeta.Qcolor)){
				record.allMeta.Qcolor = [record.allMeta.Qcolor];
			}
		});

	}]);
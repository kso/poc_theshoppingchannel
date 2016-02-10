'use strict';

angular.module('groupByDemo.recommendations', [])
	.controller('recommendationsCtrl', ['recommendationsService',
		function(recommendationsService){

			var vm = this;

			vm.forSearch = function( queryString ){
				return recommendationsService.searchRecommendations(queryString);
			};

	}]);
'use strict';

angular.module('groupByDemo.recommendations', [])
	.controller('recommendationsCtrl', ['recommendationsService', 'urlService',
		function(recommendationsService, urlService){

			var vm = this;

			vm.encode = urlService.encodeSearch;

			vm.forSearch = function( queryString ){
				return recommendationsService.searchRecommendations(queryString);
			};

	}]);
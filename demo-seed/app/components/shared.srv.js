'use strict';

angular.module('groupByDemo.util.sharedData', [])
	.service('sharedData', [ function(app_constants) {

		return {
			query : "" 
		};

	}]);
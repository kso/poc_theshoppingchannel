'use strict';

angular.module('groupByDemo.util.const', [])
	.service('CONST', [ 'app_constants', function(app_constants) {

		return app_constants;

	}]).constant('app_constants', {
		api : {
			refinement : {
				value : "Value",
				range : "Range"
			},
			order : {
				ascending : "Ascending",
				descending : "Descending"
			}
		},
		search : {
			component : {
				query : "query",
				navigation : "navigation",
				sort : "sort"
			},
		},
		nav : {
			type : {
				color : "color",
				rating : "rating",
				range : "range",
				value : "value"
			}
		}

	});

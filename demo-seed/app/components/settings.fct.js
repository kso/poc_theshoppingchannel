
angular.module('groupByDemo.shared', [])
	.factory('settingsService', function(){
		var settings = {};

		settings['Primary Nav'] = [
			{ "New Arrivals" : "field name" },
			{ "Home" : "field name" },
			{ "Women" : "field name"},
			{ "Men" : "field name"}
		];

		return settings;
	});

angular.module('groupByDemo.shared', [])
	.factory('settingsService', function(){
		var settings = {};

		settings['Primary Nav'] = [
			{ name: "New Arrivals", field_name : "field name" },
			{ name: "Home" , field_name : "field name" },
			{ name: "Women" , field_name : "field name"},
			{ name: "Men" , field_name :"field name"}
		];

		return settings;
	});
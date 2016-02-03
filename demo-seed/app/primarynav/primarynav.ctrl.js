'use strict';

angular.module('groupByDemo.primarynav', [])
	.controller('primaryNavCtrl', ['settingsService', function(settingsService){
		
		var vm = this;

		vm.navs = settingsService['Primary Nav'];

		console.log(vm.navs);

	}]);
'use strict';

angular.module("groupByDemo.search-filters", [])
	.filter('isSelectedRefinement', ['$filter', function($filter) {
		return function(selectedNavigation, navigationName, refinementValue){
			if(!selectedNavigation.length){
				return false;
			}
			//var filtered = $filter('filter')(selectedNavigation, {name: navigationName, refinements: { value: refinementValue }});
			var filteredNavigation = $filter('filter')(selectedNavigation, {name: navigationName} );

			if(filteredNavigation.length == 0){
				return false;
			}

			var filteredRefinements = $filter('filter')(filteredNavigation[0].refinements, {value : refinementValue} );	

			return filteredRefinements ?  filteredRefinements.length > 0 : false;
		}
	}]);
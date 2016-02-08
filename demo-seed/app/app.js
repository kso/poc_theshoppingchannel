'use strict';

angular.module("groupByDemo", [
	'ngRoute',
	'groupByDemo.search',
	'groupByDemo.gbc',
	'groupByDemo.product',
	'groupByDemo.typeahead',
	'groupByDemo.inspect',
	'groupByDemo.settings',
	'groupByDemo.templates',
	'groupByDemo.util.settings',
	'groupByDemo.util.filters',
	'groupByDemo.primarynav',
	'jsonFormatter',
	'as.sortable',
	'ngCart',
	'rzModule']).
config(['$routeProvider', '$locationProvider', 'JSONFormatterConfigProvider' ,
	function($routeProvider, $locationProvider, JSONFormatterConfigProvider){
	$routeProvider.
		when("/", {
			templateUrl: "templates/homepage/homepage.tpl.html", 
			controller: "homepageCtrl",
			controllerAs: "homepage"
		}).
		when("/q/:query", {
			templateUrl: "search/search-results.html", 
			controller: "searchCtrl",
			controllerAs: "search"
		}).
		when("/product/:id", {
			templateUrl: "product/product.html", 
			controller: "productCtrl",
			controllerAs: "product"
		}).
		otherwise({redirectTo: "/"});

	// use the HTML5 History API
    $locationProvider.html5Mode(true);

    JSONFormatterConfigProvider.hoverPreviewEnabled = true;
}]);
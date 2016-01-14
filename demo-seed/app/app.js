'use strict';

angular.module("groupByDemo", [
	'ngRoute',
	'groupByDemo.search',
	'groupByDemo.gbc',
	'groupByDemo.product',
	'groupByDemo.typeahead',
	]).
config(['$routeProvider', function($routeProvider){
	$routeProvider.
		when("/", {templateUrl: "search/search-results.html", controller: "searchCtrl"}).
		when("/q/:query", {templateUrl: "search/search-results.html", controller: "searchCtrl"}).
		when("/product/:id", {templateUrl: "product/product.html", controller: "productCtrl"}).
		otherwise({redirectTo: "/"});
}]);
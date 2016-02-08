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
	'groupByDemo.cart',
	'jsonFormatter',
	'as.sortable',
	'ui.router',
	'ngCart',
	'rzModule']).
config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'JSONFormatterConfigProvider' ,
	function($stateProvider, $urlRouterProvider, $locationProvider, JSONFormatterConfigProvider){

    $stateProvider.state('checkout', {
 		url: '/checkout',
  		templateUrl: '/cart/checkout.tpl.html',
  		controller: 'checkoutCtrl',
  		controllerAs: 'checkout'
	}).
	state('home', {
		url: '/',
		templateUrl: "templates/homepage/homepage.tpl.html", 
		controller: "homepageCtrl",
		controllerAs: "homepage"
	}).
	state('query', {
		url: '/q/:query',
		templateUrl: "search/search-results.html", 
		controller: "searchCtrl",
		controllerAs: "search"
	}).
	state('product', {
		url: '/product/:id',
		templateUrl: "product/product.html", 
		controller: "productCtrl",
		controllerAs: "product"
	});

	$urlRouterProvider.otherwise("/");

	// use the HTML5 History API
    $locationProvider.html5Mode(true);

    JSONFormatterConfigProvider.hoverPreviewEnabled = true;
}]);
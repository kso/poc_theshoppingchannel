'use strict';

angular.module("groupByDemo", [
	'ngRoute',
	'ngAnimate',
	'groupByDemo.search',
	'groupByDemo.gbc',
	'groupByDemo.gbc.personalization',
	'groupByDemo.gbc.recommendation',
	'groupByDemo.gbc.semantic',
	'groupByDemo.product',
	'groupByDemo.typeahead',
	'groupByDemo.inspect',
	'groupByDemo.curate',
	'groupByDemo.settings',
	'groupByDemo.templates',
	'groupByDemo.util.url',
	'groupByDemo.util.settings',
	'groupByDemo.util.filters',
	'groupByDemo.util.const',
	'groupByDemo.util.sharedData',
	'groupByDemo.primarynav',
	'groupByDemo.recommendations',
	'groupByDemo.cart',
	'jsonFormatter',
	'as.sortable',
	'ui.router',
	'ngCart',
	'ngCookies',
	'braintree-angular',
	'rzModule']).
config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'JSONFormatterConfigProvider' ,
	function($stateProvider, $urlRouterProvider, $locationProvider, JSONFormatterConfigProvider){

    $stateProvider.state('checkout', {
 		url: '/checkout',
  		templateUrl: 'cart/checkout.tpl.html',
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
		url: '/{mappings:[bcdfghjklmnpqrstvwxz]*}/{values:any}?{p:any}',
		templateUrl: "search/search-results.html", 
		controller: "searchCtrl",
		controllerAs: "search",
	   	resolve:{
    		values: ['$stateParams', function($stateParams){ 
    			return $stateParams.values; 
    		}],
    		mappings: ['$stateParams', function($stateParams){ 
    			return $stateParams.mappings; 
    		}]
      	}
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
}]).
constant('_', _);  //lodash
'use strict';

angular.module('groupByDemo.cart', ['ui.router'])
	.constant('clientTokenPath', '/api/braintree/client_token')
	.controller('checkoutCtrl', [ '$http', '$state', 'ngCart', 
		function( $http, $state, ngCart ){

		//here we can take the template name and map it to the property html template
		var vm = this; 

		vm.errors = '';

		vm.paymentOptions = {
		  onPaymentMethodReceived: function(payload) {
		    angular.merge(payload, ngCart.toObject());
		    payload.total = payload.totalCost;
		    console.error(payload);
		    $http.post('/api/orders', payload)
		    .then(function success () {
		      ngCart.empty(true);
		      $state.go('products');
		    }, function error (res) {
		      vm.errors = res;
		    });
		  }
		};

	}]);
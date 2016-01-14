'use strict';

angular.module('groupByDemo.gbc', [])
	.factory('apiService', ['$http', function($http){
		var gbcAPI = {};

		gbcAPI.clientKey = "269466c6-e7b6-4439-a175-c6d5faa069dd";

		gbcAPI.search = function(searchParametrs) {
			
			var dataObj = { 
				fields: [ "*" ],
				pageSize : 12,
				clientKey: this.clientKey
			};

			//merge the passed in searchParameters
			for (var key in searchParametrs) { dataObj[key] = searchParametrs[key]; }

			return $http.post('/api/v1/search', dataObj);
		};

		gbcAPI.sayt = function(term) {
			var dataObj = { 
				query: term,
				collection: "default"
			};
			return $http.post('/api/v1/sayt/search', dataObj);
		};

		gbcAPI.getCollectionData = function() {
			var dataObj = { clientKey: this.clientKey };
			return $http.post('/api/v1/collections', dataObj);
		};

		gbcAPI.getProduct = function(id) {
			var dataObj = { 
				refinements: [ { type: "Value", navigationName: "id", value: id } ],
				fields: [ "*" ],
				clientKey: this.clientKey
			};
			return $http.post('/api/v1/search', dataObj);
		};

		return gbcAPI;
	}]);
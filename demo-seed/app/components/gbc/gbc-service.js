'use strict';

angular.module('groupByDemo.gbc', [])
	.constant('apiConfig', {
		area : "Test",
		clientKey : "269466c6-e7b6-4439-a175-c6d5faa069dd",
		collection : "default"
	})
	.factory('apiService', ['$http', 'apiConfig', function($http, apiConfig){

		var gbcAPI = {};

		gbcAPI.search = function(searchParametrs) {
			
			//defautl values that are used if not set in searchParameters
			var dataObj = {
				fields: [ "*" ],
				pageSize : 12,
				clientKey: apiConfig.clientKey,
				area: apiConfig.area,
				collection : apiConfig.collection
			};		
		
			//merge the passed in searchParameters		
			for (var key in searchParametrs) { dataObj[key] = searchParametrs[key]; }		
  		  
			return $http.post('/api/v1/search', dataObj);

		};

		gbcAPI.sayt = function(term) {

			var base_url = "http://crateandbarreldemo.groupbycloud.com";
			var url = base_url + "/api/v1/sayt/search?";
			var parameters = {
				query : term,
				collection : apiConfig.collection, 
				area : apiConfig.area, 
				searchItems : 10,
				navigationItems : 4,
			}

			return $http.get( url, { params: parameters } );

		};

		gbcAPI.getCollectionData = function() {
			var dataObj = { clientKey: apiConfig.clientKey };
			return $http.post('/api/v1/collections', dataObj);
		};

		gbcAPI.getProduct = function(id) {
			var dataObj = { 
				refinements: [ { type: "Value", navigationName: "id", value: id } ],
				fields: [ "*" ],
				clientKey: apiConfig.clientKey
			};
			return $http.post('/api/v1/search', dataObj).then(function(response){
				console.log(response);
				return response.data.records[0];
			});
		};

		return gbcAPI;
	}]);
'use strict';

angular.module('groupByDemo.gbc', [])
	.factory('apiService', ['$http', 'settingsService', function($http, settingsService){

		var gbcAPI = {};

		gbcAPI.search = function(searchParametrs) {
			
			//defautl values that are used if not set in searchParameters
			var dataObj = {
				fields: [ "*" ],
				pageSize : 12,
				clientKey: settingsService.api.clientKey,
				area: settingsService.api.area,
				collection : settingsService.api.collection
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
				collection : settingsService.api.collection, 
				area : settingsService.api.area, 
				searchItems : 10,
				navigationItems : 4,
			};

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
				clientKey: settingsService.api.clientKey
			};
			return $http.post('/api/v1/search', dataObj).then(function(response){
				console.log(response);
				return response.data.records[0];
			});
		};

		return gbcAPI;
	}]);
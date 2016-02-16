'use strict';

angular.module('groupByDemo.gbc', [])
	.factory('apiService', ['$http', 'settingsService', function($http, settingsService){

		var gbcAPI = {};

		gbcAPI.search = function(searchParametrs) {
			
			//default values that are used if not set in searchParameters
			var dataObj = {
				fields: [ "*" ],
				pageSize : settingsService.search.pageSize,
				clientKey: settingsService.search.clientKey,
				area: settingsService.search.area,
				collection : settingsService.search.collection
			};		
		
			//merge the passed in searchParameters		
			for (var key in searchParametrs) { dataObj[key] = searchParametrs[key]; }		
  		  
			return $http.post('api/v1/search', dataObj);

		};

		gbcAPI.saytProduct = function(searchParametrs) {

			//default values that are used if not set in searchParameters
			var url = settingsService.search.saytURL + "/api/v1/sayt/products?";
			var parameters = {
				query : '',
				collection : settingsService.search.collection, 
				area : settingsService.search.area, 
				productItems: settingsService['Nav Menu Defaults'].numberOfPreviewImages
			};

			//merge the passed in searchParameters		
			for (var key in searchParametrs) { parameters[key] = searchParametrs[key]; }		

			return $http.get( url, { params: parameters } );

		};

		gbcAPI.sayt = function(term) {

			var base_url = settingsService.search.saytURL;
			var url = base_url + "/api/v1/sayt/search?";
			var parameters = {
				query : term,
				collection : settingsService.search.collection, 
				area : settingsService.search.area, 
				searchItems : settingsService.search.saytKeywords,
				navigationItems : settingsService.search.saytNavigation,
				productItems: settingsService.search.saytProducts
			};

			return $http.get( url, { params: parameters } );

		};

		gbcAPI.getCollectionData = function() {
			var dataObj = { clientKey: settingsService.search.clientKey };
			return $http.post('api/v1/collections', dataObj);
		};

		gbcAPI.getProduct = function(id) {
			var dataObj = { 
				refinements: [ { type: "Value", navigationName: "id", value: id } ],
				fields: [ "*" ],
				clientKey: settingsService.search.clientKey,
				collection : settingsService.search.collection, 
				area : settingsService.search.area, 
			};
			return $http.post('api/v1/search', dataObj).then(function(response){
				console.log(response);
				return response.data.records[0];
			});
		};

		return gbcAPI;
	}]);
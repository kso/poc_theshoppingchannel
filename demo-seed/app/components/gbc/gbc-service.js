'use strict';

angular.module('groupByDemo.gbc', [])
	.factory('apiService', ['$http', function($http){
		var gbcAPI = {};

		gbcAPI.area = "Test";
		gbcAPI.clientKey = "269466c6-e7b6-4439-a175-c6d5faa069dd";

		gbcAPI.search = function(searchParametrs) {
			
			// Set additional properties
			searchParametrs.fields = [ "*" ];
			searchParametrs.pageSize = 12;
			searchParametrs.clientKey = this.clientKey;
			searchParametrs.area = this.area;

			return $http.post('/api/v1/search', searchParametrs);
		};

		gbcAPI.sayt = function(term) {

			var base_url = "http://crateandbarreldemo.groupbycloud.com";
			var url = base_url + "/api/v1/sayt/search?";
			var parameters = {
				query : term,
				collection : "default",
				area : this.area, 
				searchItems : 10,
				navigationItems : 4,
			}

			return $http.get( url, { params: parameters } );

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
			return $http.post('/api/v1/search', dataObj).then(function(response){
				console.log(response);
				return response.data.records[0];
			});
		};

		return gbcAPI;
	}]);
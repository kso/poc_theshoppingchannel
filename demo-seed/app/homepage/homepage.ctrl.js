'use strict';

angular.module('groupByDemo.homepage', [])
	.controller('homepageCtrl', [ 'apiService', function(apiService){

			var vm = this;

			var parameters = {
				pageSize : 0,
				query : "",
				customUrlParams: [ { key: "page", value: "home" } ] ,
				fields : "",
			};

  		  	console.time("search");
		  	apiService.search(parameters).success(function(data){
		  		console.timeEnd("search");

		  		vm.content = data.template.zones;



				console.log(data);
			});

	}]).filter("sanitize", ['$sce', function($sce) {
  		return function(htmlCode){
   		 return $sce.trustAsHtml(htmlCode);
  		};
  	}]);
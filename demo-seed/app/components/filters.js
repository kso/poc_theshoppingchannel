'use strict';

angular.module('groupByDemo.util.filters', [])
	.filter("sanitize", ['$sce', function($sce) {
  		return function(htmlCode){
   		 return $sce.trustAsHtml(htmlCode);
  		};
  	}]);
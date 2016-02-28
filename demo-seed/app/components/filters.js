'use strict';

angular.module('groupByDemo.util.filters', [])
	.filter("sanitize", ['$sce', function($sce) {
  		return function(htmlCode){
   		 return $sce.trustAsHtml(htmlCode);
  		};
  	}])
  	//http://stackoverflow.com/questions/18095727/limit-the-length-of-a-string-with-angularjs
  	.filter('cut', function () {   
        return function (value, wordwise, max, tail) {
            if (!value) return '';

            max = parseInt(max, 10);
            if (!max) return value;
            if (value.length <= max) return value;

            value = value.substr(0, max);
            if (wordwise) {
                var lastspace = value.lastIndexOf(' ');
                if (lastspace != -1) {
                    value = value.substr(0, lastspace);
                }
            }

            return value + (tail || ' …');
        };
    });
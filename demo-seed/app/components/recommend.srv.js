'use strict';

angular.module("groupByDemo.gbc.recommendation",[])
	.service('recommendationsService', [function () {

		var service = this; 

		service.searchRecommendations = function( searchTerm ){

			if(!searchTerm)
				return null; 

			return service.data[searchTerm.toLowerCase()];
		};

		service.data = {

			"bed" : ["queen bed", "king bed", "full bed", "bed sheets", "oliver bed"],
			"queen bed" : ["queen bed sheets", "queen bed frame", "queen duvet cover", "queen mattress pad"],
			"king bed" : ["king bed sheets", "king bed frame", "king duvet cover", "king mattress pad"],
			"full bed" : ["full bed sheets", "full bed frame", "full duvet cover", "full mattress pad"],

			"plates" : ["dinner plate", "salad plate", "appetizer plate", "square plate", "plate set"],
			"plate" : ["dinner plate", "salad plate", "appetizer plate", "square plate", "plate set"],
			"dinner plate" : ["square dinner plate", "white dinner plate", "large dinner plate", "on sale dinner plate"],

		};


	}]);

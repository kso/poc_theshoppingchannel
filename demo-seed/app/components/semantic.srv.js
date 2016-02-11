'use strict';

angular.module("groupByDemo.gbc.semantic",[])
	.service('semanticSearchService', [function () {

		var service = this; 

		//converts a search query into query + refinement
		service.interpretSort = function( searchTerm,  sortParam){

			//TODO add in other patterns here that map to sorting:
			//	- size: large/big/small/highest/widest
			//	- popularity
			//	- new/old

			return service.priceOrderPattern(searchTerm, sortParam);
		};

		//converts a search query into query + refinement
		service.interpretFilter = function( searchQuery ){

			//TODO add in other patterns that imply filtering:
			//	- category/taxonomy match filter
			return service.priceOverUnderPattern(searchQuery);

		};

		service.priceOrderPattern = function( searchQuery, sortParam ){

			// Cheap, lowprice, low price - Sort on price
			var cheapTerms = ['cheap', 'low price', 'lowprice'];
			for(var ii = 0; ii < cheapTerms.length; ii++){
				if (searchQuery.toLowerCase().indexOf(cheapTerms[ii]) > -1) {
					searchQuery = searchQuery.replace(cheapTerms[ii], '').trim();

					sortParam = {};
					sortParam.field = 'price';
					sortParam.order = 'Ascending';
				}
			}
			// Expensive - Sort on price
			var expensiveTerms = ['expensive', 'overpriced', 'pricey'];
			for(var ii = 0; ii < expensiveTerms.length; ii++){
				if (searchQuery.toLowerCase().indexOf(expensiveTerms[ii]) > -1) {
					searchQuery = searchQuery.replace(expensiveTerms[ii], '').trim();

					sortParam = {};
					sortParam.field = 'price';
					sortParam.order = 'Descending';
				}
			}

			return { sort : sortParam, query : searchQuery };

		};

		service.priceOverUnderPattern = function( searchQuery ){

			// Automatic Price refinement
			var overPattern = / over\s*.[0-9]*/i;
			var underPattern = / under\s*.[0-9]*/i;
			var numberPattern = /[0-9]+/;

			var refinement_parameter = [];

			var under = underPattern.test(searchQuery);
			var over = overPattern.test(searchQuery);

			if(!under && !over)
				return { refinements : refinement_parameter, query : searchQuery };

			var refineIndex = searchQuery.search(under ? underPattern: overPattern);
			var refineValueIndex = searchQuery.search(numberPattern);
			var refineValue = searchQuery.substring(refineValueIndex);
			searchQuery = searchQuery.substring(0,refineIndex).trim();

			var priceRefinement = {};
			priceRefinement.type = "Range";
			priceRefinement.navigationName = "price";

			// Plates under $15
			if (under){
				priceRefinement.low = 0;
				priceRefinement.high = parseInt(refineValue);
			// Tables over $1500
			} else if (over){
				priceRefinement.low = parseInt(refineValue);
				priceRefinement.high = 99999;
			}

			refinement_parameter = refinement_parameter.concat(priceRefinement);

			return { refinements : refinement_parameter, query : searchQuery };

		};

	}]);
'use strict';

angular.module("groupByDemo.gbc.semantic",[])
	.service('semanticSearchService', [ 'CONST', 'settingsService', function (CONST, settingsService) {

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

			var price_field = settingsService['Display Fields'].price;

			if(!searchQuery){
				return { sort : sortParam, query : searchQuery };
			}

			// TODO make this configurable
			// Cheap, lowprice, low price - Sort on price
			var cheapTerms = ['cheapest', 'cheap', 'low price', 'lowprice'];
			for(var ii = 0; ii < cheapTerms.length; ii++){
				if (searchQuery.toLowerCase().indexOf(cheapTerms[ii]) > -1) {
					searchQuery = searchQuery.replace(cheapTerms[ii], '').trim();

					sortParam = {};
					sortParam.field = price_field;
					sortParam.order = CONST.api.order.ascending;
				}
			}

			// TODO make this configurable
			// Expensive - Sort on price
			var expensiveTerms = ['expensive', 'overpriced', 'pricey'];
			for(var ii = 0; ii < expensiveTerms.length; ii++){
				if (searchQuery.toLowerCase().indexOf(expensiveTerms[ii]) > -1) {
					searchQuery = searchQuery.replace(expensiveTerms[ii], '').trim();

					sortParam = {};
					sortParam.field = price_field;
					sortParam.order = CONST.api.order.descending;
				}
			}

			return { sort : sortParam, query : searchQuery };

		};

		service.priceOverUnderPattern = function( searchQuery ){

			var price_field = settingsService['Display Fields'].price;
			var id_field = settingsService['Display Fields'].id;

			// Automatic Price refinement
			var overPattern = / over\s*.[0-9]*/i;
			var underPattern = / under\s*.[0-9]*/i;
			var numberPattern = /[0-9]+/;

			var refinement_parameter = [];

			var under = underPattern.test(searchQuery);
			var over = overPattern.test(searchQuery);
			var onsale = searchQuery ? (searchQuery.toLowerCase().indexOf('on sale') > -1) : false;
			var partNumber = numberPattern.test(searchQuery);

			if(!under && !over && !onsale && !partNumber)
				return { refinements : refinement_parameter, query : searchQuery };

			var refineIndex = searchQuery.search(under ? underPattern: overPattern);
			var refineValueIndex = searchQuery.search(numberPattern);
			var refineValue = searchQuery.substring(refineValueIndex);

			if(under || over)
				searchQuery = searchQuery.substring(0,refineIndex).trim();

			var priceRefinement = {};
			priceRefinement.type = CONST.api.refinement.range;
			priceRefinement.navigationName = price_field;

			//WARNING: demo-specific code
			//TODO: need to extract this to make it configurable
			if(onsale){
				var onsale_refinement = {
					type : CONST.api.refinement.value,
					navigationName : "on_sale",
					value : "On Sale"
				};
				refinement_parameter = refinement_parameter.concat(onsale_refinement);
			}

			// Plates under $15
			if (under){
				priceRefinement.low = 0;
				priceRefinement.high = parseInt(refineValue);
				refinement_parameter = refinement_parameter.concat(priceRefinement);
			// Tables over $1500
			} else if (over){
				priceRefinement.low = parseInt(refineValue);
				priceRefinement.high = 99999;
				refinement_parameter = refinement_parameter.concat(priceRefinement);
			} else if (partNumber) {
				searchQuery = "";
				var partNoRefinement = {
					type : CONST.api.refinement.value,
					navigationName : id_field,
					value : refineValue
				};
				refinement_parameter = refinement_parameter.concat(partNoRefinement);
			}

			return { refinements : refinement_parameter, query : searchQuery };

		};

	}]);
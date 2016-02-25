'use strict';

angular.module("groupByDemo.util.url",[])
	.service('urlService', ['settingsService', '$filter', 'CONST',
	 function (settingsService, $filter, CONST) {

		var service = this; 

		var encodeSearch = function(v){
			return v.split(' ').join('+');
		};

		var decodeSearch = function(v) {
			return v.split('+').join(' '); 
		};

		var encodeNav = function(refinement, navType){

			if(navType === CONST.nav.type.value){
				return encodeSearch(refinement.value).split('&').join('and');
			}

			if(navType === CONST.nav.type.range){
				return refinement.low + "-" + refinement.high;
			}

		};

		var decodeNav = function(v, navType){

			if(navType === CONST.nav.type.value){
				return decodeSearch(v).split(' and ').join(' & ');
			}

			if(navType === CONST.nav.type.range){
				return v.split('-');
			}

		};

		var processQuery = function(inQuery) {
			var outQuery = decodeSearch(inQuery);

			//'all' is a special query to return all results
			if(outQuery === "all"){
				return "";
			}

			return outQuery;
		};

		var processNavigation = function(navigation, type, value){

			var mapping = settingsService['SEO-Friendly URL'][type];

			if(mapping.navType === CONST.nav.type.value){
				return processValueNavigation(navigation, mapping, value);
			}

			if(mapping.navType === CONST.nav.type.range){
				return processRangeNavigation(navigation, mapping, value);
			}

		};

		var processRangeNavigation = function(navigation, mapping, value){

			var range = decodeNav(value, CONST.nav.type.range);

			var refinement = {
				type : CONST.api.refinement.range,
				navigationName : mapping.value,
				low: range[0],
				high : range[1]
			};

			var nav = {
				name : mapping.value,
				displayName : mapping.displayName,
				type : CONST.nav.type.range,
				selected : [refinement]
			};

			nav.slider = service.buildSliderModel(range[0], range[1], mapping.value);

			navigation.push(nav);
		};

		var processValueNavigation = function(navigation, mapping, value){

			var refinement = {
				type : CONST.api.refinement.value,
				navigationName : mapping.value,
				value: decodeNav(value, CONST.nav.type.value)
			};

			//if a refinement was multi-selected, the nav model may already exist
			var navModel = $filter('filter')(navigation, { name : mapping.value } );
			if(navModel.length > 0){
				navModel[0].selected.push(refinement);
				return;
			}

			var nav = {
				name : mapping.value,
				displayName : mapping.displayName,
				type : CONST.nav.type.value,
				selected : [refinement]
			};
			navigation.push(nav);

		};

		service.buildSliderModel = function(lo_bucket, hi_bucket, name){
			return {
				min : lo_bucket,  
				max : hi_bucket,
				options : { 
					id : name, 
					floor: lo_bucket, 
					ceil: hi_bucket
				}
			};
		};

		service.processURL = function(types, values){

			var model = {
				query : "",
				navigation : []
			};	

			for(var i=0; i<values.length; i++){

				var type = types[i];
				var value = values[i];

				var mapping = settingsService['SEO-Friendly URL'][type];

				if(mapping.component === CONST.search.component.query){
					model.query = processQuery(value);
					continue;
				} 

				if(mapping.component === CONST.search.component.navigation) {
					processNavigation(model.navigation, type, value);

				}
			}

			return model;
		};

		//takes the current search and navigation state and maps it to a URL
		service.toURL = function(query, selectedNavigation) {

			var mapping = "";
			var path = "";

			if(query){
				mapping = mapping.concat("q");
				path = path.concat("/").concat( query.split(' ').join('+') );
			}

			selectedNavigation = $filter('orderBy')(selectedNavigation, function(x) { 
				return settingsService['URL Parameter Ordering'].indexOf(x.navigationName);
			});

			angular.forEach( selectedNavigation , function(sel){
				angular.forEach( settingsService['SEO-Friendly URL'], function( value, letter ){
					console.log(value);
					if(value.type === CONST.search.component.query)
						return;
					if(value.value === sel.navigationName){
						mapping = mapping.concat(letter);
						path = path.concat("/").concat( encodeNav(sel, value.navType) );
					}
				});
			});

			console.log(mapping.concat(path));

			return mapping.concat(path);

		};

	}]);
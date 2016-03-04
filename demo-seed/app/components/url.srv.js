'use strict';

angular.module("groupByDemo.util.url",[])
	.service('urlService', ['settingsService', '$filter', 'CONST',
	 function (settingsService, $filter, CONST) {

		var service = this; 

		service.encodeSearch = function(v){
			return v.split(' ').join('+');
		};

		service.decodeSearch = function(v) {
			return v.split('+').join(' '); 
		};

		service.encodeRefinement = function(refinement){

			if(refinement.type === CONST.api.refinement.value){
				return service.encodeSearch(refinement.value).split('&').join('and');
			}

			if(refinement.type === CONST.api.refinement.range){
				return refinement.low + "~" + refinement.high;
			}

		};

		service.decodeRefinement = function(v, refinementType){

			if(refinementType === CONST.api.refinement.value){
				return service.decodeSearch(v).split(' and ').join(' & ');
			}

			if(refinementType === CONST.api.refinement.range){
				return v.split('~');
			}

		};

		var processQuery = function(inQuery) {
			var outQuery = service.decodeSearch(inQuery);

			return outQuery;
		};

		var processNavigation = function(navigation, mapping, value){

			if(mapping.navType === CONST.nav.type.value){
				return processValueNavigation(navigation, mapping, value);
			}

			if(mapping.navType === CONST.nav.type.range){
				return processRangeNavigation(navigation, mapping, value);
			}

		};

		var processRangeNavigation = function(navigation, mapping, value){

			var range = service.decodeRefinement(value, CONST.api.refinement.range);

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
				value: service.decodeRefinement(value, CONST.api.refinement.value)
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

		var inferRefinementType = function(value){

			//if there's a dash, assume it is a range refinement
			return value.indexOf('~') === -1 ? CONST.nav.type.value : CONST.nav.type.range;

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

		service.processURL = function(letters, values, unmappedParameters){

			var model = {
				query : "",
				navigation : []
			};	

			for(var i=0; i<values.length; i++){

				var letter = letters[i];
				var value = values[i];

				var mapping = settingsService['SEO-Friendly URL'][letter];

				if(mapping.component === CONST.search.component.query){
					model.query = processQuery(value);
					continue;
				} 

				if(mapping.component === CONST.search.component.navigation) {
					processNavigation(model.navigation, mapping, value);

				}
			}

			if(!unmappedParameters)
				return model;

			var parameters = Object.keys(unmappedParameters);
			for(var i=0; i<parameters.length; i++){
				var value = unmappedParameters[parameters[i]];

				var dummyMapping = {
					component : CONST.search.component.navigation, 
					navType : inferRefinementType(value),
					value: parameters[i],
					displayName : "N/A",  //we don't know this from the URL
				};

				processNavigation(model.navigation, dummyMapping, value);
			}

			return model;
		};

		//takes the current search and navigation state and maps it to a state object
		service.toState = function(query, selectedNavigation) {

			var mapping = "";
			var path = "";
			var parameters = {};

			if(query){
				mapping = mapping.concat(settingsService.searchChar());
				path = path.concat("/").concat( service.encodeSearch(query) );
			}

			selectedNavigation = $filter('orderBy')(selectedNavigation, function(x) { 
				return settingsService['URL Parameter Ordering'].indexOf(x.navigationName);
			});

			angular.forEach( selectedNavigation , function(sel){
				var letter = settingsService.navToChar(sel.navigationName);

				if(letter.length > 0){
					var navDefinition = settingsService['SEO-Friendly URL'][letter];
					mapping = mapping.concat(letter);
					path = path.concat("/").concat( service.encodeRefinement(sel) );
					return;
				}

				var paramName = service.encodeSearch(sel.navigationName);
				var paramValue = service.encodeRefinement(sel);
				if( parameters.hasOwnProperty(paramName) ){ // a multi-select refinement maps to an array 
					var v = parameters[paramName];
					parameters[paramName] = Array.isArray(v) ? v.concat(paramValue) : [v].concat(paramValue);
				} else {
					parameters[paramName] = paramValue;
				}

			});

			//remove leading slash on path
			if(path.length > 0){
				path = path.substring(1);
			}

			var state = { 'mappings' : mapping,  'values' : path };

			if(Object.keys(parameters).length > 0){
				var queryString = service.paramsToQueryString(parameters);
				state.p = queryString;
			} else {
				state.p = null;
			}

			return state;

		};

		service.queryStringToParams = function(queryString){

			var params = {};

			if(!queryString)
				return params;

			angular.forEach( queryString.split('&') , function(paramString){

				var p = paramString.split('=');
				var paramName = p[0];
				var paramValue = p[1];

				if( params.hasOwnProperty(paramName) ){ // a multi-select refinement maps to an array 
					var v = params[paramName];
					params[paramName] = Array.isArray(v) ? v.concat(paramValue) : [v].concat(paramValue);
				} else {
					params[paramName] = paramValue;
				}
			});

			return params;
		};

		service.paramsToQueryString = function(params){

			var queryString = "";

			angular.forEach( params , function(paramValue, paramName){
				queryString = queryString.length > 0 ? queryString + "&" : queryString;

				var values = [];
				if(!Array.isArray(paramValue)){
					values.push(paramValue);
				} else {
					values = paramValue;
				}

				for(var i=0; i<values.length; i++){
					queryString = queryString + paramName + "=" + values[i];
				}

			});
			return queryString;
		};


	}]);
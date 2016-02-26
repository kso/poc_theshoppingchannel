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
				return refinement.low + "-" + refinement.high;
			}

		};

		service.decodeRefinement = function(v, refinementType){

			if(refinementType === CONST.api.refinement.value){
				return service.decodeSearch(v).split(' and ').join(' & ');
			}

			if(refinementType === CONST.api.refinement.range){
				return v.split('-');
			}

		};

		var processQuery = function(inQuery) {
			var outQuery = service.decodeSearch(inQuery);

			//'all' is a special query to return all results
			if(outQuery === "all"){
				return "";
			}

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
			return value.indexOf('-') === -1 ? CONST.nav.type.value : CONST.nav.type.range;

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

			//TODO: decode unmapped parameters
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

		//takes the current search and navigation state and maps it to a URL
		service.toURL = function(query, selectedNavigation) {

			var mapping = "";
			var path = "";
			var parameters = "";

			if(query){
				mapping = mapping.concat("q");
				path = path.concat("/").concat( query.split(' ').join('+') );
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

				parameters = parameters.length > 0 ? parameters + "&" : "?";
				parameters = parameters + service.encodeSearch(sel.navigationName) + "=" + service.encodeRefinement(sel);
				

			});
			path = path.concat(parameters);

			var fullpath = mapping.concat(path);
			console.log(fullpath);

			return fullpath;

		};

	}]);
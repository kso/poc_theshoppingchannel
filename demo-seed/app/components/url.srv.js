'use strict';

angular.module("groupByDemo.util.url",[])
	.service('urlService', ['settingsService', '$filter', function (settingsService, $filter) {

		var service = this; 

		service.processURL = function(types, values){

			var model = {
				query : "",
				navigation : []
			};	

			for(var i=0; i<values.length; i++){

				var type = types[i];
				var value = values[i];

				value = value.split('+').join(' '); 

				var mapping = settingsService['SEO-Friendly URL'][type];

				if(mapping.type === "search"){
					model.query = value;
					//'all' is a special query to return all results
					if(model.query === "all"){ 
						model.query = ""; 	
					}
					continue;
				} 


				if(mapping.type === "navigation") {

					var refinement = {
						type : "Value",
						navigationName : mapping.value,
						value : value.split(' and ').join(' & ')
					};

					//if a refinement was multi-selected, the nav model may already exist
					var navModel = $filter('filter')(model.navigation, { name : mapping.value } );
					if(navModel.length > 0){
						navModel[0].selected.push(refinement);
						continue;
					}

					var nav = {
						name : mapping.value,
						displayName : mapping.displayName,
						type : "value",
						selected : [refinement]
					};
					model.navigation.push(nav);
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
					if(value.type === "search")
						return;
					if(value.value === sel.navigationName){
						mapping = mapping.concat(letter);
						path = path.concat("/").concat( sel.value.split(' ').join('+').split('&').join('and') );
					}
				});
			});

			console.log(mapping.concat(path));

			return mapping.concat(path);

		};

	}]);
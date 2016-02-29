'use strict';

angular.module("groupByDemo.gbc.merchandising",['ngCookies'])
	.service('merchandisingService', ['$cookies', function ($cookies) {

		var service = this; 

		service.recordPinEvent = function( search, nav, id, add ){

			console.log("recording Pinning Event "  + getKey(search, nav) + " " + id + " " + add );

			var searchpins = $cookies.getObject("searchpins");
			searchpins = searchpins ? searchpins : {};

			var key = getKey(search, nav);
			searchpins[key] = searchpins[key] ? searchpins[key] : [];

			if(add){
				searchpins[key].push(id);
			} else {
				var index = searchpins[key].indexOf(id);
				if (index == -1)
					return;
				searchpins[key].splice(index, 1);
			}

			$cookies.putObject("searchpins", searchpins);
		};

		service.isPinned = function(search, nav, id){
			var pinnedItems = service.getBringToTop( getKey(search, nav) );
			return pinnedItems.indexOf(id);		
		};

		service.getBringToTop = function( search, nav ) {
			var key = getKey(search, nav);
			var searchpins = $cookies.getObject("searchpins");
			if(!searchpins || !searchpins[key]){
				return [];
			}
			return searchpins[key];	
		};

		var getKey = function(search, nav){
			var navString = JSON.stringify( nav );
			return search + "+" + navString;
		};

	}]);
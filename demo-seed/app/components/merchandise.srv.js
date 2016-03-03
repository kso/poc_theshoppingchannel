'use strict';

angular.module("groupByDemo.gbc.merchandising",['ngCookies'])
	.service('merchandisingService', ['$cookies', '_', 'settingsService',
	 function ($cookies, _ , settingsService) {

		var service = this; 

		var newCuratedPageDefinition = function(){
			return {
				curatedByPosition : {},	//key = position, value = id
				curatedById : {},	//key = id, value = position
				excluded : []	//ids to exclude from the page
			};
		};


		service.buryEvent = function( search, nav, id, add ){

			console.log("recording Bury Event "  + getKey(search, nav) + " " + id + " " + add );

			var curatedPages = $cookies.getObject("curatedPages");
			curatedPages = curatedPages ? curatedPages : {};

			var key = getKey(search, nav);
			if(!_.has(curatedPages,key)){
				curatedPages[key] = newCuratedPageDefinition();
			}

			var pageDefn = curatedPages[key];

			if(add){
				pageDefn.excluded.push(id);
			} else {
				_.remove( pageDefn.excluded, id);
			}

			$cookies.putObject("curatedPages", curatedPages);
		};


		service.recordCurateEvent = function( search, nav, id, position, add ){

			console.log("recording Pinning Event "  + getKey(search, nav) + " " + id + " " + add );

			var curatedPages = $cookies.getObject("curatedPages");
			curatedPages = curatedPages ? curatedPages : {};

			var key = getKey(search, nav);
			if(!_.has(curatedPages,key)){
				curatedPages[key] = newCuratedPageDefinition();
			}

			var pageDefn = curatedPages[key];

			if(add){
				//is the position already taken? If so, find the next availble position
				if(_.has(pageDefn.curatedByPosition, position)){
					var higherPositionsThatAreTaken = _.takeRightWhile( _.sortBy(_.keys(pageDefn.curatedByPosition)), function(v) { return v > position; }  );

					//go through possible values until one is found
					for(var i=position+1, j=0; i<200; i++){
						if(j < higherPositionsThatAreTaken.length && i == higherPositionsThatAreTaken[j]){
							j++;
							continue;
						}
						position = i;
						break;
					}
				}

				_.set( pageDefn, 'curatedByPosition.' + position, id);
				_.set( pageDefn, 'curatedById.' + id, position);
			} else {
				_.unset( pageDefn, 'curatedByPosition.' + position);
				_.unset( pageDefn, 'curatedById.' + id);
			}

			$cookies.putObject("curatedPages", curatedPages);
		};

		service.isPinned = function(search, nav, id){
			var pinnedItems = service.getBringToTop( search, nav );
			return pinnedItems.indexOf(id);		
		};

		service.wherePinned = function(search, nav, id){
			var key = getKey(search, nav);
			var curatedPages = $cookies.getObject("curatedPages");
			if(!curatedPages || !curatedPages[key]){
				return -1;
			}
			var position = curatedPages[key].curatedById[id];
			return position === undefined ? -1 : position;
		};

		service.getBringToTop = function( search, nav ) {
			var key = getKey(search, nav);
			var curatedPages = $cookies.getObject("curatedPages");
			if(!curatedPages || !curatedPages[key]){
				return [];
			}
			return _.values( curatedPages[key].curatedByPosition );	
		};

		service.getExcluded = function(search, nav ) {
			var key = getKey(search, nav);
			var curatedPages = $cookies.getObject("curatedPages");
			if(!curatedPages || !curatedPages[key]){
				return [];
			}
			return curatedPages[key].excluded;	
		};

		service.curateResults = function( search, nav, results ) {

			var curatedPages = $cookies.getObject("curatedPages");
			if(!curatedPages){
				return results;
			}

			var key = getKey(search, nav);
			if(!_.has(curatedPages,key)){
				return results;
			}

			var curatedIds = _.values(curatedPages[key].curatedByPosition);


			var id_field = settingsService['Display Fields'].id
			//remove the pinned results
			var curatedResults = _.remove( results, function(result) {
				return _.indexOf( curatedIds, result.allMeta[id_field] ) !== -1;
			});

			//key the curated results by ID
			var curatedResultLookup = _.keyBy( curatedResults, '.allMeta.' + id_field );

			//add the pinned results back in the correct locations
			_.forIn( curatedPages[key].curatedByPosition, function(productId, position) {
				results.splice(position, 0, curatedResultLookup[productId]);
			} );

			return results; 

		};

		var getKey = function(search, nav){
			var navString = JSON.stringify( nav );
			return search + "+" + navString;
		};

	}]);
'use strict';

angular.module("groupByDemo.search",['ui.bootstrap'])
	.controller('searchCtrl', ['$scope', '$location', '$uibModal', 'apiService', '$state', '$stateParams', '$filter', 
			'settingsService', 'personalizationService', 'merchandisingService', 'semanticSearchService', 'urlService', 'CONST', 
			'$timeout', 'sharedData', '_', 
			function ($scope, $location, $uibModal, apiService, $state, $stateParams, $filter, 
				settingsService, personalizationService, merchandisingService, semanticSearchService, 
				urlService, CONST, $timeout, sharedData, _ ) {

		console.group("Loading Search Controller");

		$scope.currentPage = 1;

		var view_model = this;

		console.log($stateParams);
		var types = $stateParams.mappings.split('');
		var values = $stateParams.values.split('/');
		var unmappedParameters = urlService.queryStringToParams($stateParams.p);

		var modelFromURL = urlService.processURL(types, values, unmappedParameters);
		sharedData.query = modelFromURL.query; //shared with typeahead!
		view_model.query = modelFromURL.query; //controller keeps its own model to support e.g. autocorrect of search.
		view_model.navigation = modelFromURL.navigation;

		view_model.resultSummary =  "";
		view_model.personalizationEnabled = settingsService.Personalization.Status;
		view_model.displayFields = settingsService['Display Fields'];

	    $scope.sortFields = settingsService.Sorting;

		$scope.$watch( function( scope ) {
				var hasChanged = settingsService.Personalization.Status !== view_model.personalizationEnabled;
				var isValid = settingsService.Personalization.Status === "on" || settingsService.Personalization.Status === "off";
				return hasChanged && isValid;
			},
			function(newValue, oldValue) {

				if(oldValue)
					return;

				//callback sometimes fires when controller is initialized
				var hasChanged = settingsService.Personalization.Status !== view_model.personalizationEnabled;
				if(!hasChanged) 
					return;

				view_model.personalizationEnabled = settingsService.Personalization.Status;
				view_model.search();

			});

	    view_model.getPageSize = function(){
			return settingsService.search.pageSize;
	    };


	    //TODO: move this out of the search controller. This mapping in settings service. 
	    view_model.navDisplayNameToModelType = function(displayname){

	    	switch(displayname){
	    		case "Color":
	    			return CONST.nav.type.color;
	    		case "Rating":
	    			return CONST.nav.type.rating;
	    	}

	    	return null;
	    };

		//augment the navigation with additional info needed to render
		view_model.updateNavModel = function(navModel, navFromSearch, navSelected){

			//reset the navigation objects from search
			angular.forEach(navModel, function(model){ delete model.raw; });

			//we use this to pick up category names of selected refinements when rebuilding state from a URL
			angular.forEach(navSelected, function(nav){
				var matchingModels = $filter('filter')(navModel, { name : nav.name });

				if(matchingModels.length > 0){
					var model = matchingModels[0];
					model.displayName = nav.displayName;

					var specialType = view_model.navDisplayNameToModelType(model.displayName);
					if(specialType){
						model.type = specialType;		
					}
				}

			});

			angular.forEach(navFromSearch, function(nav){

				var found = $filter('filter')(navModel, { name : nav.name});
				var model =  found.length ? found[0] : navModel[ navModel.push({ selected: [] })-1 ];
 
				model.raw = nav;
				model.displayName = nav.displayName;
				model.name = nav.name;

				model.type = nav.range ? CONST.nav.type.range : CONST.nav.type.value; //default

				var specialType = view_model.navDisplayNameToModelType(model.displayName);
				model.type = specialType ? specialType : model.type;		

				if(!nav.range) { return; }
				if(nav.displayName === "Rating") { return; }

				var onSliderRefinement = function(id, low, high) {
						console.log(id + " " + low + " " + high);
						view_model.refine(id, { low : low, high : high }, CONST.api.refinement.range);
				};

				//keep existing values if a refinement is already applied
				if('slider' in model) { 
					//make sure there is a callback defined, this is not set by URL service.
					model.slider.options.onEnd = onSliderRefinement;
					return; 
				}

				var lo_bucket = 0;
				var hi_bucket = 0;
				// get the smallest and largest buckets
				angular.forEach(nav.refinements, function(ref){
					lo_bucket = Math.min(ref.low, lo_bucket);
					hi_bucket = Math.max(ref.high, hi_bucket);
				});

				model.slider = urlService.buildSliderModel(lo_bucket, hi_bucket, nav.name, view_model.refine ); 
				model.slider.options.onEnd = onSliderRefinement;
			});

			//determine whether to show the model or not
			angular.forEach(navModel, function(model){ 
				model.visible = model.selected.length > 0 || 'raw' in model ; 
			});


			var navigationOrder = [];
			angular.forEach(navFromSearch, function(nav){ 
				navigationOrder.push(nav.displayName);
			});

			//order the model according to how it is returned by search
			navModel = $filter('orderBy')(navModel, function(x) { 
				return navigationOrder.indexOf(x.displayName);
			});

			return navModel;

		};

		view_model.getSort = function(queryString) {

			var sortParam = {};

			// Don't set sort if it's not initialized, meaning when 
			//	this function is called. Defaults to relevance, so that
			//	should be the first parameter always.
			if(typeof $scope.sort !== 'undefined'){
				sortParam.field = $scope.sort.field;
				sortParam.order = $scope.sort.order;
			}
			else {
				sortParam.field = '_relevance';	
			}

			sortParam = semanticSearchService.interpretSort(queryString, sortParam );

			return sortParam;

		};

		view_model.interpretSearch = function( queryString ){

			var sortInterpretation = view_model.getSort(queryString);
			var filterInterpretation = semanticSearchService.interpretFilter( sortInterpretation.query );

			var interpretation = {};
			interpretation.sort = sortInterpretation.sort;
			interpretation.query = filterInterpretation.query;

			interpretation.refinements = filterInterpretation.refinements;

			return interpretation;

		};

		view_model.personalize = function(parameters){

			console.log("personalization is : " + settingsService.Personalization.Status);

			if(settingsService.Personalization.Status !== "on")
				return parameters;

			var query_time_bias = personalizationService.applyProfile(view_model.query, view_model.getSelectedNavigation(view_model.navigation));
			if(query_time_bias === null)
				return parameters;

			parameters.biasing = query_time_bias;
			return parameters;
		};

		//returns deep cloned version of selected navigation, sorted alphabetically
		view_model.getSelectedNavigation = function( navigationModel ){

			var selectedNavigation = [];
			angular.forEach(navigationModel, function(nav){
				angular.forEach(nav.selected, function(sel){
					var copy = angular.copy(sel);
					selectedNavigation.push(copy);
				});
			});

			//TODO: this logic is duplicated in the primary nav controller, extract it. 
			//sort first by navigation name, then value (for multi-select refinements)
			selectedNavigation = $filter('orderBy')(selectedNavigation, ['navigationName', 'value']);

			return selectedNavigation;
		};

		view_model.applyExclusions = function(query, nav) {

			var exclusions = merchandisingService.getExcluded(query, nav);

			var exclusion_refinements = _.transform( exclusions, function(result, exclusion ){

				result.push({
					type : CONST.api.refinement.value,
					navigationName : 'id',
					value : exclusion,
					exclude : true
				});

			}, []);

			return exclusion_refinements;

		};

		view_model.search = function () {

			console.group("Running Search");

			var refinement_parameter = view_model.getSelectedNavigation(view_model.navigation);

			//semantic translation of the search
			var interpretation = view_model.interpretSearch(view_model.query);
			var sort = interpretation.sort;
			var query = interpretation.query; 
			refinement_parameter = refinement_parameter.concat(interpretation.refinements);

			var refinement_exclusions = view_model.applyExclusions(view_model.query, view_model.getSelectedNavigation(view_model.navigation));
			refinement_parameter = refinement_parameter.concat(refinement_exclusions);

			var parameters = {
				skip : view_model.getPageSize() * ($scope.currentPage - 1),
				pageSize : view_model.getPageSize(),
				query : query,
				refinements : refinement_parameter,
				sort: sort,
				fields: settingsService.search.fields
			};

			parameters = view_model.personalize(parameters);

  		  	console.time("search");
		  	apiService.search(parameters).success(function(data){
		  		console.timeEnd("search");
		  		console.log("Search API Data", data);
				view_model.totalRecordCount = data.totalRecordCount;
				view_model.navigation = view_model.updateNavModel(view_model.navigation, data.availableNavigation, data.selectedNavigation );
				view_model.selectedNavigation = data.selectedNavigation;
				view_model.resultList = merchandisingService.curateResults(view_model.query, 
					view_model.getSelectedNavigation(view_model.navigation), 
					data.records);
				view_model.relatedQueries = data.relatedQueries;

				view_model.template = undefined;
				if("template" in data && data.template.name !== 'default') {
					view_model.template = data.template;
					console.log("Loading template:" + data.template.name);
				}

				var firstResult = view_model.getPageSize() * ($scope.currentPage - 1) + 1;
				var lastResult =  Math.min( firstResult + view_model.getPageSize() - 1, view_model.totalRecordCount);

				var formattedRecordCount = $filter('number')(view_model.totalRecordCount);
				view_model.resultSummary =  firstResult.toString() + " - " + lastResult.toString() + " of " +  formattedRecordCount + " Products";

				console.log("Search Model", view_model);

				console.groupEnd();

				//workaround for slider issue:  https://github.com/angular-slider/angularjs-slider/issues/79
				$timeout(function(){
					$scope.$broadcast('reCalcViewDimensions');
				}, 300);
			});
		};

		view_model.reload = function(){

			//takes the current search and navigation state and maps it to a URL
			var state = urlService.toState( view_model.query,  view_model.getSelectedNavigation(view_model.navigation));

			console.group("Changing State");
			console.log(state);

			//TODO: possible to go to new state without having to re-load the controller (notify = false)? 
			//It could  make for a more seamless refresh
			$state.go('query', state, {notify: true});

			console.groupEnd();

		};

		view_model.refine = function(nav_data_name, ref_selected, type) {

			var refinement = {};
			refinement.type = type;
			refinement.navigationName = nav_data_name;
			
			var navModel = $filter('filter')(view_model.navigation, { name : nav_data_name } )[0];

			switch(type){
				case CONST.api.refinement.range:
					console.log("add refinement: " + nav_data_name + " -->  " + ref_selected.low + "-" + ref_selected.high);
					refinement.low = ref_selected.low;
					refinement.high = ref_selected.high;

					//remove any existing values for this refinement
					navModel.selected = [];

					break;
				case CONST.api.refinement.value:
					console.log("add refinement: " + nav_data_name + " -->  " + ref_selected.value);
					refinement.value = ref_selected.value;
					break;
			}

			if(settingsService.Personalization.Fields.indexOf(nav_data_name) !== -1){
				personalizationService.recordProfileEvent( nav_data_name, ref_selected.value);
			}

			navModel.selected.push( refinement ); 

			view_model.reload();
		};

		view_model.unrefine = function(nav_data_name, ref_unselected) {

			console.log("remove value refinement: " + nav_data_name + " -->  " +
				 (ref_unselected.type === CONST.api.refinement.value ? ref_unselected.value : ref_unselected.low + "-" + ref_unselected.high)) ;

			angular.forEach(view_model.navigation, function(nav){

				if(nav.name !== nav_data_name) { return; }

				nav.selected = $filter('filter')(nav.selected, function(o) { 

					if(ref_unselected.type !== o.type){
						return true;
					}

					if(ref_unselected.type === CONST.api.refinement.value){
						console.log(o);
						return !(o.navigationName === nav_data_name 
							&& o.value === ref_unselected.value);
					}

					if(ref_unselected.type === CONST.api.refinement.range){
						return !(o.navigationName === nav_data_name 
							&& o.high == ref_unselected.high 
							&& o.low == ref_unselected.low );
					}

				});	


			});

			view_model.reload();
		}; 

		view_model.moveToPosition = function(id, position){

			if( view_model.isPinned(id) ) //skip if already pinned
				return;

			var selectedNavigation = view_model.getSelectedNavigation(view_model.navigation);
			merchandisingService.recordCurateEvent(view_model.query, selectedNavigation, id, position, true);
			view_model.search();
		};

		view_model.removeCuratedItem = function(id){

			var selectedNavigation = view_model.getSelectedNavigation(view_model.navigation);
			var position = merchandisingService.wherePinned(view_model.query, selectedNavigation, id); 
			if( position === -1 ) //skip if not pinned
				return;

			merchandisingService.recordCurateEvent(view_model.query, selectedNavigation, id, position, false );
			view_model.search();
		};

		//TODO: There is no way to remove a buried item right now
		view_model.bury = function(id){

			if( view_model.isPinned(id) ) //don't allow bury on pinned items
				return;

			var selectedNavigation = view_model.getSelectedNavigation(view_model.navigation);
			merchandisingService.buryEvent(view_model.query, selectedNavigation, id, true); 
			view_model.search();
		};

		view_model.curate = function(product_id, position){

			var modalInstance = $uibModal.open({
			  animation: true,
			  templateUrl: "curate/curate.tpl.html",
			  controller: "curateCtrl as curate",
			  size: "lg",
			  resolve : {
			  	id : function () { return product_id; },
			  	position : function  () { return position + 1; }
			  }
			});

			modalInstance.result.then(function ( result ) {
					view_model.moveToPosition( result.id, result.position-1 );
			    }, function () {
			    	console.log('Curate modal dismissed');
			    });

		};

		view_model.isPinned = function(id){
			var selectedNavigation = view_model.getSelectedNavigation(view_model.navigation);
			return (merchandisingService.isPinned(view_model.query, selectedNavigation, id) > -1);
		};

		view_model.inspect = function(product_id){

			console.log(product_id);

			var modalInstance = $uibModal.open({
			  animation: true,
			  templateUrl: "inspect/inspect.tpl.html",
			  controller: "inspectCtrl as inspect",
			  size: "lg",
			  resolve : {
			  	id : function () { return product_id; }
			  }
			});
		};


		console.groupEnd();
		view_model.search();

	}]);
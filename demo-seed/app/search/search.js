'use strict';

angular.module("groupByDemo.search",['ui.bootstrap'])
	.controller('searchCtrl', ['$scope', '$location', '$uibModal', 'apiService', '$stateParams', '$filter', 
			'settingsService', 'personalizationService', 'semanticSearchService', 'urlService',
			function ($scope, $location, $uibModal, apiService, $stateParams, $filter, 
				settingsService, personalizationService, semanticSearchService, urlService) {

		console.log("loading search controller");

		$scope.currentPage = 1;

		var view_model = this;

		var types = $stateParams.mapping.split('');
		var values = $stateParams.query.split('/');

		var modelFromURL = urlService.processURL(types, values);
		view_model.query = modelFromURL.query;
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

		//takes the current search and navigation state and maps it to a URL
		view_model.toURL = function() {
			return urlService.toURL( view_model.query,  view_model.getSelectedNavigation(view_model.navigation));
		};

	    view_model.getPageSize = function(){
			return settingsService.search.pageSize;
	    };

		//augment the navigation with additional info needed to render
		view_model.updateNavModel = function(navModel, navFromSearch){

			//reset the navigation objects from search
			angular.forEach(navModel, function(model){ delete model.raw; });

			angular.forEach(navFromSearch, function(nav){

				var found = $filter('filter')(navModel, { displayName : nav.displayName});
				var model =  found.length ? found[0] : navModel[ navModel.push({ selected: [] })-1 ];
 
				model.raw = nav;
				model.displayName = nav.displayName;
				model.name = nav.name;
				model.type = nav.range ? "range" : "value"; //default

				switch(nav.displayName){
					case "Color":
						model.type = "color";
						break;
					case "Rating":
						model.type = "rating";
						break;
				}

				if(!nav.range) { return; }

				//keep existing values if a refinement is already applied
				var currentVal = $filter('filter')(model.selected, { navigationName : nav.name, type : 'Range'});	
				if(currentVal.length > 0) { return; }

				var lo_bucket = 0;
				var hi_bucket = 0;
				// get the smallest and largest buckets
				angular.forEach(nav.refinements, function(ref){
					lo_bucket = Math.min(ref.low, lo_bucket);
					hi_bucket = Math.max(ref.high, hi_bucket);
				});

				model.slider = {
					min : currentVal.length > 0 ? currentVal[0].low : lo_bucket,  
					max : currentVal.length > 0 ? currentVal[0].high : hi_bucket,
					options : { 
						id : nav.name, 
						floor: lo_bucket, 
						ceil: hi_bucket,
						onEnd: function(id, low, high) {
							console.log(id + " " + low + " " + high);
							view_model.refine(id, { low : low, high : high }, 'Range');
						}
					}
				}; 
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

			//sort first by navigation name, then value (for multi-select refinements)
			selectedNavigation = $filter('orderBy')(selectedNavigation, ['navigationName', 'value']);

			return selectedNavigation;
		};

		view_model.search = function () {

			var refinement_parameter = view_model.getSelectedNavigation(view_model.navigation);

			//semantic translation of the search
			var interpretation = view_model.interpretSearch(view_model.query);
			var sort = interpretation.sort;
			var query = interpretation.query; 
			refinement_parameter = refinement_parameter.concat(interpretation.refinements);

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
		  		console.log(data);
				view_model.totalRecordCount = data.totalRecordCount;
				view_model.resultList = data.records;
				view_model.navigation = view_model.updateNavModel(view_model.navigation, data.availableNavigation );
				view_model.selectedNavigation = data.selectedNavigation;

				view_model.template = undefined;
				if("template" in data && data.template.name !== 'default') {
					view_model.template = data.template;
					console.log("Loading template:" + data.template.name);
				}

				var firstResult = view_model.getPageSize() * ($scope.currentPage - 1) + 1;
				var lastResult =  Math.min( firstResult + view_model.getPageSize() - 1, view_model.totalRecordCount);
				view_model.resultSummary =  firstResult.toString() + " - " + lastResult.toString() + " of " +  view_model.totalRecordCount.toString() + " Products";

				console.log(view_model);
			});
		};

		view_model.refine = function(nav_data_name, ref_selected, type) {

			var refinement = {};
			refinement.type = type;
			refinement.navigationName = nav_data_name;
			
			var navModel = $filter('filter')(view_model.navigation, { name : nav_data_name } )[0];

			switch(type){
				case "Range":
					console.log("add refinement: " + nav_data_name + " -->  " + ref_selected.low + "-" + ref_selected.high);
					refinement.low = ref_selected.low;
					refinement.high = ref_selected.high;

					//remove any existing values for this refinement
					navModel.selected = [];

					break;
				case "Value":
					console.log("add refinement: " + nav_data_name + " -->  " + ref_selected.value);
					refinement.value = ref_selected.value;
					break;
			}

			if(settingsService.Personalization.Fields.indexOf(nav_data_name) !== -1){
				personalizationService.recordProfileEvent( nav_data_name, ref_selected.value);
			}

			navModel.selected.push( refinement ); 

			$location.path( view_model.toURL() );
		};

		view_model.unrefine = function(nav_data_name, ref_unselected) {

			console.log("remove value refinement: " + nav_data_name + " -->  " +
				 (ref_unselected.type === "Value" ? ref_unselected.value : ref_unselected.low + "-" + ref_unselected.high)) ;

			angular.forEach(view_model.navigation, function(nav){

				if(nav.name !== nav_data_name) { return; }

				nav.selected = $filter('filter')(nav.selected, function(o) { 

					if(ref_unselected.type !== o.type){
						return true;
					}

					if(ref_unselected.type === "Value"){
						console.log(o);
						return !(o.navigationName === nav_data_name 
							&& o.value === ref_unselected.value);
					}

					if(ref_unselected.type === "Range"){
						return !(o.navigationName === nav_data_name 
							&& o.high == ref_unselected.high 
							&& o.low == ref_unselected.low );
					}

				});	


			});

			$location.path( view_model.toURL() );
		}; 

		view_model.pin = function(id){
			var selectedNavigation = view_model.getSelectedNavigation(view_model.navigation);
			personalizationService.recordPinEvent(view_model.query, selectedNavigation, id, !view_model.isPinned(id) );
			view_model.search();
		};

		view_model.isPinned = function(id){
			var selectedNavigation = view_model.getSelectedNavigation(view_model.navigation);
			return (personalizationService.isPinned(view_model.query, selectedNavigation, id) > -1);
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

		view_model.search();

	}]);
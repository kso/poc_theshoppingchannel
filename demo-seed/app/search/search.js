'use strict';

angular.module("groupByDemo.search",['ui.bootstrap'])
	.controller('searchCtrl', ['$scope', 'apiService', '$routeParams', '$filter', 
			function ($scope, apiService, $routeParams, $filter) {

		$scope.currentPage = 1;

		var view_model = this;

		view_model.refinements = [];
		view_model.query = $routeParams.query;
		view_model.pageSize = 30;
		view_model.resultSummary =  "";

	    $scope.sortFields = [
	        {'display': 'Relevancy', 			'field': '_relevance', 	'order' : 'Descending'},
	        {'display': 'Price - Low to High', 	'field': 'price', 		'order' : 'Ascending'},
	        {'display': 'Price - High to Low', 	'field': 'price', 		'order' : 'Descending'},
	        {'display': 'Rating', 				'field': 'Qrating', 	'order' : 'Descending'}
	    ];

		view_model.search = function () {

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

			var parameters = {
				skip : view_model.pageSize * ($scope.currentPage - 1),
				pageSize : view_model.pageSize,
				query : view_model.query,
				refinements : view_model.refinements,
				sort: sortParam
			};

		  	apiService.search(parameters).success(function(data){
				console.log(data);
				view_model.totalRecordCount = data.totalRecordCount;
				view_model.resultList = data.records;
				view_model.navigationList = data.availableNavigation;
				view_model.selectedNavigation = data.selectedNavigation;

				var firstResult = view_model.pageSize * ($scope.currentPage - 1) + 1
				var lastResult =  firstResult + view_model.pageSize - 1
				view_model.resultSummary =  firstResult.toString() + " - " + lastResult.toString() + " of " +  view_model.totalRecordCount.toString() + " Products";
			});
		};

		view_model.refine = function(navigation, refinement_value, type) {

			console.log("add refinement: " + navigation + " -->  " + refinement_value);
			
			var refinement = {}
			refinement.type = type;
			refinement.navigationName = navigation;
			
			switch(type){
				case "Range":
					console.log("TODO");
					break;
				case "Value":
					refinement.value = refinement_value;
					break;
			}

			view_model.refinements.push( refinement );

			view_model.search();
		}

		view_model.unrefine = function(navigation, refinement_value) {

			console.log("remove refinement: " + navigation + " -->  " + refinement_value);

			view_model.refinements = $filter('filter')(view_model.refinements, {navigationName: '!'+navigation, value: '!'+refinement_value});	
			view_model.search();
		} 

		view_model.search();

	}])
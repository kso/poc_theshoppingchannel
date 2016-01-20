'use strict';

angular.module("groupByDemo.search",['ui.bootstrap'])
	.controller('searchCtrl', ['$scope', 'apiService', '$routeParams', function ($scope, apiService, $routeParams) {

		$scope.currentPage = 1;
		
		var view_model = this;

		view_model.query = $routeParams.query;
		view_model.pageSize = 30;
		view_model.resultSummary =  "";

		view_model.search = function () {

			var parameters = {
				skip : view_model.pageSize * ($scope.currentPage - 1),
				pageSize : view_model.pageSize,
				query : view_model.query
			};

		  	apiService.search(parameters).success(function(data){
				//console.log(data);
				view_model.totalRecordCount = data.totalRecordCount;
				view_model.resultList = data.records;
				view_model.navigationList = data.availableNavigation;

				var firstResult = view_model.pageSize * ($scope.currentPage - 1) + 1
				var lastResult =  firstResult + view_model.pageSize - 1
				view_model.resultSummary =  firstResult.toString() + " - " + lastResult.toString() + " of " +  view_model.totalRecordCount.toString() + " Products";
			});
		};

		view_model.search();

	}])
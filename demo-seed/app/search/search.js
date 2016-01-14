'use strict';

angular.module("groupByDemo.search",['ui.bootstrap'])
	.controller('searchCtrl', ['$scope', 'apiService', '$routeParams', function ($scope, apiService, $routeParams) {

		$scope.query = $routeParams.query;
		$scope.currentPage = 1;
		$scope.pageSize = 12;
		$scope.pageTitle =  "";

		$scope.doSearch = function () {

			console.log("running search")

			var searchParameters = {
				skip : $scope.pageSize * ($scope.currentPage - 1),
				query : $scope.query
			};

		  	apiService.search(searchParameters).success(function(data){
				console.log(data);
				$scope.totalRecordCount = data.totalRecordCount;
				$scope.resultList = data.records;
				$scope.navigationList = data.availableNavigation;

				var firstResult = $scope.pageSize * ($scope.currentPage - 1) + 1
				var lastResult =  firstResult + $scope.pageSize - 1
				$scope.pageTitle =  firstResult.toString() + " - " + lastResult.toString() + " of " +  $scope.totalRecordCount.toString() + " Products";
			});
		};

		$scope.doSearch();

	}])
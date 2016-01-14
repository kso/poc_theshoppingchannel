'use strict';

// taken from the ui.bootstrap example: http://angular-ui.github.io/bootstrap/#/typeahead

angular.module('groupByDemo.typeahead', []).controller('TypeaheadCtrl', ['$scope', '$http', '$location', 'apiService', function($scope, $http, $location, apiService) {

  // Any function returning a promise object can be used to load values asynchronously
  $scope.sayt = function(val) {
    return apiService.sayt(val).then(function(response){
      return response.data.result.searchTerms;
    });
  };

  var redirect = function(label){

  	var queryString = typeof label === 'object' ? label.value : label;

    if(!queryString || queryString === "all"){
	    $location.path( "/" );
	    return;
    } 
    $location.path( "/q/" + queryString.split(' ').join('+') );
  }

  $scope.onSaytEnter = function (text) {
  	redirect(text);
  }

  $scope.onSaytSelect = function ($item, $model, $label) {
    $scope.$item = $item;
    $scope.$model = $model;
    $scope.$label = $label;

	redirect($label);
  };

  $scope.modelOptions = {
    debounce: {
      default: 500,
      blur: 250
    },
    getterSetter: true
  };

}]);
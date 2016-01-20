'use strict';

// taken from the ui.bootstrap example: http://angular-ui.github.io/bootstrap/#/typeahead

angular.module('groupByDemo.typeahead', []).controller('TypeaheadCtrl', ['$http', '$location', 'apiService', function($http, $location, apiService) {

  var view_model = this;

  // Any function returning a promise object can be used to load values asynchronously
  view_model.fetch = function(val) {
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

  view_model.onEnterKey = function (text) {
  	redirect(text);
  }

  view_model.onSelectItem = function ($item, $model, $label) {
    view_model.$item = $item;
    view_model.$model = $model;
    view_model.$label = $label;

	redirect($label);
  };

  view_model.modelOptions = {
    debounce: {
      default: 500,
      blur: 250
    },
    getterSetter: true
  };

}]);
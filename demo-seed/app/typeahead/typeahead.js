'use strict';

// taken from the ui.bootstrap example: http://angular-ui.github.io/bootstrap/#/typeahead

angular.module('groupByDemo.typeahead', [])
.controller('TypeaheadCtrl', ['settingsService', 'personalizationService', '$q', '$location', 
  'apiService', 'sharedData', 'CONST',
  function(settingsService, personalizationService, $q, $location, apiService, sharedData, CONST) {

  var vm = this;

  vm.cancellers = [];
  vm.saytdata = [];
  vm.data = sharedData;
  vm.lastProductSearch = "";

  // Any function returning a promise object can be used to load values asynchronously
  vm.fetch = function(val) {
    console.time("sayt");
    var canceller = $q.defer();
    vm.cancellers.push(canceller); 
    return apiService.sayt(val, canceller).then(function(response){
      console.timeEnd("sayt");

      var cancellerIndex = vm.cancellers.indexOf(canceller);
      if(cancellerIndex > -1){
        vm.cancellers.splice(cancellerIndex, 1);
      }

      // The uib-typeahead expects data in arrays, so we need to restructure.
      //  The SAYT template takes nested arrays into consideration
      var arrayResponse = [[],[],[]]; //searchTerms, Navigation, Products

      var firstSuggestion = "";

      // Search suggestions
      if (response.data.result && response.data.result.searchTerms){
        for (var ii=response.data.result.searchTerms.length;ii--;){
            var item = response.data.result.searchTerms[ii];

            if(ii===0){
              firstSuggestion = item.value;
            }

            item.url = 'q/' + item.value.replace(' ','+');

            if(item.additionalInfo && item.additionalInfo[settingsService.search.saytScopedKeywordField]){
              item.scopes = item.additionalInfo[settingsService.search.saytScopedKeywordField];
              item.scopeChar = settingsService.navToChar(settingsService.search.saytScopedKeywordField);
            }
            item.type = 'searchTerms';
          }
        arrayResponse[0] = response.data.result.searchTerms;
      }
  
      // Navigations
      if (response.data.result.navigations){
        var navigations = [];
        for (var ii=response.data.result.navigations.length;ii--;){
          var navigation = response.data.result.navigations[ii];

          //TODO: extract to settings
          if(navigation.name !== 'CBrand'){
            continue;
          }

          if (navigation.values){
            for (var jj=navigation.values.length;jj--;){
              var item = navigation.values[jj];

              var newNav = {};
              newNav.value = item;
              newNav.field = navigation.name;
              newNav.url = '';
              newNav.type = 'navigations';
              newNav.fieldDisplayName = "Brand"; //TODO: extract to settings
              navigations.push(newNav);
            }
          }
        }
        if(navigations.length >0) {
          arrayResponse[1] = navigations;
        }
      }

      var displayFields = settingsService['SAYT Display Fields'];

      // Products
      var products = vm.saytdata.length > 0 ? vm.saytdata[2].slice() : [];

      var productQuery = firstSuggestion.length === 0 ? val : firstSuggestion;
      if(vm.lastProductSearch !== productQuery){

        console.time("saytProducts");
        apiService.search(getProductSearchParameters(productQuery)).then( function(response) {
              console.timeEnd("saytProducts");
              var displayFields = settingsService['SAYT Display Fields'];

              if (response.data.records){

                products.length = 0;

                for (var ii=response.data.records.length;ii--;){
                  var product = response.data.records[ii];
                  if (product.allMeta){
                      var newProd = {};
                      newProd.value = product.allMeta[displayFields.title];
                      newProd.url = 'product/' + product.allMeta[displayFields.id];
                      newProd.type = 'products';
                      newProd.price = product.allMeta[displayFields.price];
                      newProd.image = product.allMeta[displayFields.image];
                      products.push(newProd);
                  }
                }
              }
            }); 
      }

      arrayResponse[2] = products;

      //if the request was cancelled after we got the response, suppress the results
      if(canceller.promise.$$state.status !== 0){
        vm.saytdata.length = 0;
      } else {
        vm.saytdata = arrayResponse;
      }

      return vm.saytdata;

    }, function(response){
      console.timeEnd("sayt");
      console.log("error");
      console.log(response);

      var cancellerIndex = vm.cancellers.indexOf(canceller);
      if(cancellerIndex > -1){
        vm.cancellers.splice(cancellerIndex, 1);
      }

    });
  };

  var getProductSearchParameters = function (searchTerm ){

    var refinement_parameter = [];

    var parameters = {
      excludedNavigations : '*',
      pageSize : settingsService.search.saytProducts,
      query : searchTerm,
      refinements : refinement_parameter,
      fields: settingsService.getNames(settingsService['SAYT Display Fields'])
    };

    if(settingsService.Personalization.Status === "on"){
      var query_time_bias = personalizationService.applyProfile(searchTerm, refinement_parameter);
      if(query_time_bias !== null)
        parameters.biasing = query_time_bias;
    }

    if(refinement_parameter.length > 0){
      parameters.refinements = refinement_parameter;
    }

    return parameters;

  };


  var redirect = function(label){

  	var queryString = typeof label === 'object' ? label.value : label;

    //cancel any pending requqests
    angular.forEach( vm.cancellers, function(cancel) {
      cancel.resolve();
    });
    vm.saytdata.length = 0;

    if(!queryString){
	    $location.path( "/" );
	    return;
    } 

    $location.path( "q/" + queryString.split(' ').join('+') );
  };

  vm.onEnterKey = function (text) {
  	redirect(text);
  };

  vm.onSelectItem = function ($item, $model, $label) {
    vm.$item = $item;
    vm.$model = $model;
    vm.$label = $label;

	  redirect($label);
  };

  vm.modelOptions = {
    debounce: {
      default: 500,
      blur: 250
    },
    getterSetter: true
  };

}]);
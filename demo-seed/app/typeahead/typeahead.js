'use strict';

// taken from the ui.bootstrap example: http://angular-ui.github.io/bootstrap/#/typeahead

angular.module('groupByDemo.typeahead', [])
.controller('TypeaheadCtrl', ['settingsService', 'personalizationService', '$q', '$location', 
  'apiService', 'sharedData', 'CONST', 'merchandisingService', 'urlService', '_',
  function(settingsService, personalizationService, $q, $location, 
    apiService, sharedData, CONST, merchandisingService, urlService, _ ) {

  var vm = this;

  vm.cancellers = [];
  vm.saytdata = [];
  vm.data = sharedData;
  vm.lastProductSearch = "";

  var encodeRefinement = function(refinementValue) {
    return urlService.encodeRefinement({ type: CONST.api.refinement.value, value : refinementValue });
  };

  // Any function returning a promise object can be used to load values asynchronously
  vm.fetch = function(val) {
    console.time("sayt");
    var canceller = $q.defer();
    vm.cancellers.push(canceller); 
    return apiService.sayt(val, canceller).then(function(response){
      console.timeEnd("sayt");
	  console.log (response);
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

            item.url = settingsService.searchChar() + '/' +urlService.encodeSearch(item.value);

            if(item.additionalInfo && item.additionalInfo[settingsService.search.saytScopedKeywordField]){
              item.scopes = item.additionalInfo[settingsService.search.saytScopedKeywordField];
              var scopeChar = settingsService.navToChar(settingsService.search.saytScopedKeywordField);
              var searchChar = settingsService.searchChar();

              item.scopedURLs = [];
              for(var scope_idx = 0; scope_idx < item.scopes.length; scope_idx ++){
                item.scopedURLs.push( searchChar + scopeChar + '/' + urlService.encodeSearch(item.value) + '/' +  encodeRefinement(item.scopes[scope_idx])) ;
              }
            }
            item.type = 'searchTerms';
          }
        arrayResponse[0] = response.data.result.searchTerms;
      }
  
      // Navigations
      if (response.data.result.navigations){
        var navigations = [];
        for (var nav_idx=0; nav_idx < response.data.result.navigations.length; nav_idx++){
          var navigation = response.data.result.navigations[nav_idx];

          //We only show navigations that are listed for display in the settings.
          var saytNavSettings = _.find(settingsService.search.saytNavigationFields, [ 'value', navigation.name ]);
          if(!saytNavSettings){
            continue;
          }

          if (navigation.values){

            var refinements = [];

            var navChar = settingsService.navToChar(navigation.name);

            for (var refinement_idx=0; refinement_idx < navigation.values.length; refinement_idx++){
              var refinementValue = navigation.values[refinement_idx];

              var newRefinement = {
                value : refinementValue,
                field : navigation.name,
                url : navChar + '/' + encodeRefinement(refinementValue),
                fieldDisplayName : saytNavSettings.displayName
              };

              refinements.push(newRefinement);
            }

            navigations.push({ type : 'navigations', 'refinements': refinements, limit : saytNavSettings.limit });
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

      //don't make repeated product queries for the same thing. The first keyword doesn't change that often
      if(vm.lastProductSearch !== productQuery){

        vm.lastProductSearch = productQuery;
        console.time("saytProducts");
        apiService.search(getProductSearchParameters(productQuery)).then( function(response) {
              console.timeEnd("saytProducts");
              var displayFields = settingsService['SAYT Display Fields'];


              if (response.data.records){

                response.data.records = merchandisingService.curateResults(productQuery, [], response.data.records);

                products.length = 0;

                for (var product_idx = 0; product_idx < response.data.records.length; product_idx++){
                  var product = response.data.records[product_idx];
                  if (product.allMeta){
                      var newProd = {};
                      newProd.value = product.allMeta[displayFields.title];
                      newProd.url = 'https://www.theshoppingchannel.com/' + product.allMeta[displayFields.url];
                      newProd.type = 'products';
                      newProd.price = product.allMeta[displayFields.price];
                      newProd.image = urlService.findImage(product.allMeta[displayFields.image], "160x160");
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
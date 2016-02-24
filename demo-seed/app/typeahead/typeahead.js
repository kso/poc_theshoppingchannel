'use strict';

// taken from the ui.bootstrap example: http://angular-ui.github.io/bootstrap/#/typeahead

angular.module('groupByDemo.typeahead', [])
.controller('TypeaheadCtrl', ['settingsService', '$q', '$location', 'apiService', 'sharedData', 
  function(settingsService, $q, $location, apiService, sharedData) {

  var vm = this;

  vm.cancellers = [];
  vm.saytdata = [];
  vm.data = sharedData;

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
      var arrayResponse = [];

      // Search suggestions
      if (response.data.result && response.data.result.searchTerms){
        for (var ii=response.data.result.searchTerms.length;ii--;){
            var item = response.data.result.searchTerms[ii];
            item.url = 'q/' + item.value.replace(' ','+');
            item.type = 'searchTerms';
          }
        arrayResponse.push(response.data.result.searchTerms);
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
          arrayResponse.push(navigations);
        }
      }

      var displayFields = settingsService['SAYT Display Fields'];

      // Products
      if (response.data.result.products){
        var products = [];
        for (var ii=response.data.result.products.length;ii--;){
          var product = response.data.result.products[ii];
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
        arrayResponse.push(products);
      }


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
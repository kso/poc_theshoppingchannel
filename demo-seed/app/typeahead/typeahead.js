'use strict';

// taken from the ui.bootstrap example: http://angular-ui.github.io/bootstrap/#/typeahead

angular.module('groupByDemo.typeahead', [])
.controller('TypeaheadCtrl', ['$q', '$location', 'apiService', function($q, $location, apiService) {

  var view_model = this;

  view_model.cancellers = [];
  view_model.saytdata = [];

  // Any function returning a promise object can be used to load values asynchronously
  view_model.fetch = function(val) {
    console.time("sayt");
    var canceller = $q.defer();
    view_model.cancellers.push(canceller); 
    return apiService.sayt(val, canceller).then(function(response){
      console.timeEnd("sayt");

      var cancellerIndex = view_model.cancellers.indexOf(canceller);
      if(cancellerIndex > -1){
        view_model.cancellers.splice(cancellerIndex, 1);
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
          if (navigation.values){
            for (var jj=navigation.values.length;jj--;){
              var item = navigation.values[jj];

              var newNav = {};
              newNav.value = item;
              newNav.field = navigation.name;
              newNav.url = '';
              newNav.type = 'navigations';
              navigations.push(newNav);
            }
          }
        }
        arrayResponse.push(navigations);
      }

      // Products
      if (response.data.result.products){
        var products = [];
        for (var ii=response.data.result.products.length;ii--;){
          var product = response.data.result.products[ii];
          if (product.allMeta){
              var newProd = {};
              newProd.value = product.allMeta.title;
              newProd.url = 'product/' + product.allMeta.ID;
              newProd.type = 'products';
              newProd.price = product.allMeta.price;
              newProd.image = product.allMeta.image_url;
              products.push(newProd);
          }
        }
        arrayResponse.push(products);
      }


      //if the request was cancelled after we got the response, suppress the results
      if(canceller.promise.$$state.status !== 0){
        view_model.saytdata.length = 0;
      } else {
        view_model.saytdata = arrayResponse;
      }

      return view_model.saytdata;

    }, function(response){
      console.timeEnd("sayt");
      console.log("error");
      console.log(response);

      var cancellerIndex = view_model.cancellers.indexOf(canceller);
      if(cancellerIndex > -1){
        view_model.cancellers.splice(cancellerIndex, 1);
      }

    });
  };

  var redirect = function(label){

  	var queryString = typeof label === 'object' ? label.value : label;

    //cancel any pending requqests
    angular.forEach( view_model.cancellers, function(cancel) {
      cancel.resolve();
    });
    view_model.saytdata.length = 0;

    if(!queryString){
	    $location.path( "/" );
	    return;
    } 

    $location.path( "q/" + queryString.split(' ').join('+') );
  };

  view_model.onEnterKey = function (text) {
  	redirect(text);
  };

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
'use strict';

angular.module('groupByDemo.primarynav', [])
	.controller('primaryNavCtrl', ['settingsService', 'apiService', '$filter', 
		function(settingsService, apiService, $filter){
		
		console.log("loading primary nav controller");

		var vm = this;
		var defaults = settingsService['Nav Menu Defaults'];

		//we create a fixed array of N objects so that only N dom elements (tracked by id) are created by angular
		//If the array and object are replaced each time, angular creates new DOM elements, sometimes
		//before the old ones have been cleaned up, leading to extra images in the menu 
		vm.preview = [];
		var n = defaults.numberOfPreviewImages;
		for (var i = 0; i < n; i++)
		    vm.preview.push({ id : i , product : {} });


		vm.clearPreviewImages = function() {
			var n = settingsService['Nav Menu Defaults'].numberOfPreviewImages;
			for (var i = 0; i < n; i++) {
				delete vm.preview[i].product.record;
				delete vm.preview[i].product.oldrecord;
			}
		};

		vm.updateImagesForCategory = function( category, subCategory, searchTerm ){

			var parameters = {};

			var refinementParameter = "";
			if(category){
				refinementParameter = refinementParameter + category.field_name + "=" + category.value
			}
			if(subCategory){
				refinementParameter = refinementParameter +
					(category ? "~" : "") + 
					subCategory.field_name + "=" + subCategory.value;
			}

			if(refinementParameter.length > 0){
				parameters.refinements = refinementParameter;
			}

			if(searchTerm){
				parameters.query = searchTerm;
			}

			apiService.saytProduct(parameters).success(function(data){

				var n = settingsService['Nav Menu Defaults'].numberOfPreviewImages;
				for (var i = 0; i < n; i++) {

					if(!data.result.products || i >= data.result.products.length ){
						delete vm.preview[i].product.record;
						delete vm.preview[i].product.oldrecord;
						continue;
					}

					if(vm.preview[i].product.record){
						vm.preview[i].product.oldrecord = vm.preview[i].product.record;
					}

				    vm.preview[i].product.record = data.result.products[i];
				}

			});
		};

		vm.buildMenuFromSearch = function(nav){

			var menu = {};
			var defaults = settingsService['Nav Menu Defaults'];

			menu.name = nav.displayName ? nav.displayName : nav.value;
			menu.value  = nav.value ? nav.value : nav.displayName;
			menu.field_name = nav.navigationName ? nav.navigationName : defaults.menuNavigationName;

			var parameters = {
				pageSize : 0,
				query : "",
				fields : "",
			};


			menu.items = [];

			var refinement = {
				type : "Value",
				navigationName : nav.navigationName ? nav.navigationName : defaults.menuNavigationName, 
				value : nav.value
			};
			parameters.includedNavigations = defaults.subMenuNavigationName;  
			parameters.refinements = [ refinement ];

		  	apiService.search(parameters).success(function(data){

				var menu_items = data.availableNavigation[0].refinements;

				menu_items = $filter('limitTo')(menu_items, defaults.menuSize);

				angular.forEach(menu_items, function(item){ 
					menu.items.push({ 
						name : item.displayName ? item.displayName : item.value,
						value : item.value ? item.value : item.displayName,
						path : "#", //TODO
						field_name : data.availableNavigation[0].name
					});
				});

				//console.log(data);
			});

		  	return menu;
		};

		vm.navs = [];

		//do the searches for each menu to populate nav with data
		angular.forEach(settingsService['Nav Menu'], function(nav){ 

			var menu = {};
			menu.name = nav.displayName;
			menu.items = [];
			menu.searchTerm = nav.searchTerm;

			vm.navs.push( menu );

			if(!nav.submenu){
				menu.items.push( vm.buildMenuFromSearch(nav)   );
			} else {
				angular.forEach(nav.submenu, function(subnav){ 
					menu.items.push( vm.buildMenuFromSearch(subnav)   );
				});
			}

		});

	}]).directive('imageChange', function($timeout){
	    return {
	        restrict: 'A',
	        link: function($scope, element, attrs){
	            element.on('load', function() {
	            	$timeout(function() {
		                element.removeClass("ng-hide-fade");
		                element.addClass("ng-show");
		            }, 100);
	            });
	            attrs.$observe("ngSrc", function () {
	                element.removeClass("ng-show");
	                element.addClass("ng-hide-fade");
	            });
	        }
	    };
	});
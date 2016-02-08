'use strict';

angular.module('groupByDemo.primarynav', [])
	.controller('primaryNavCtrl', ['settingsService', 'apiService', '$filter', 
		function(settingsService, apiService, $filter){
		
		var vm = this;

		vm.buildMenuFromSearch = function(nav){

			var menu = {};
			menu.name = nav.displayName ? nav.displayName : nav.value;

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
						path : "#" //TODO
					});
				});

				//console.log(data);
			});

		  	return menu;
		};

		vm.navs = [];

		var defaults = settingsService['Nav Menu Defaults'];

		//do the searches for each menu to populate nav with data
		angular.forEach(settingsService['Nav Menu'], function(nav){ 

			var menu = {};
			menu.name = nav.displayName;
			menu.items = [];

			vm.navs.push( menu );

			if(!nav.submenu){
				menu.items.push( vm.buildMenuFromSearch(nav)   );
			} else {
				angular.forEach(nav.submenu, function(subnav){ 
					menu.items.push( vm.buildMenuFromSearch(subnav)   );
				});
			}

		});

	}]);
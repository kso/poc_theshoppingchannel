
angular.module('groupByDemo.shared', [])
	.factory('settingsService', function(){
		var settings = {};


		settings['Nav Menu Defaults'] = {
			menuNavigationName : "QtopRatedType",
			subMenuNavigationName : "Qtype",
			menuSize : 5

		}
		settings['Nav Menu'] = [
			{ displayName: "Dining & Entertaining", submenu: 
				[
					{ value: "Dinnerware" },
					{ value: "Flatware" },
					{ value: "Drinkware" },
					{ value: "Serveware" }
				]
			},
			{ displayName: "Kitchen", submenu: 
				[
					{ value: "Cookware & Bakeware" },
					{ value: "Cutlery" },
					{ value: "Kitchen Appliances & Electrics", displayName: "Appliances & Electrics" },
					{ value: "Kitchen Accessories", displayName: "Accessories" }
				]
			},
			{ displayName: "Decor & Pillows", submenu: 
				[
					{ value: "Pillows & Throws" },
					{ value: "Candle Holders & Vases" },
					{ value: "Wall Decor & Mirrors" },
					{ value: "Home Accessories" }
				]
			},
			{ navigationName: "QtopRatedType", 
				value: "Lighting", 
				displayName: "Lighting", 
				menuField: "Qtype",
			},
			{ displayName: "Bed & Bath", submenu: 
				[
					{ value: "Bedding" },
					{ value: "Bath" },
				]
			},
			{ displayName: "Outdoor", submenu: 
				[
					{ value: "Outdoor Entertaining", displayName: "Entertaining" },
					{ value: "Outdoor Accessories", displayName: "Accessories" },
					{ value: "Outdoor Dining Furniture", displayName: "Dining" }
				]
			},			
		];

		return settings;
	});
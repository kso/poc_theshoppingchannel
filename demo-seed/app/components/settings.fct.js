
angular.module('groupByDemo.shared', [])
	.factory('settingsService', function(){
		var settings = {};


		settings['Nav Menu Defaults'] = {
			menuNavigationName : "QtopRatedType",
			subMenuNavigationName : "Qtype",
			menuSize : 5

		}
		settings['Nav Menu'] = [
			{ displayName: "Kitchen", submenu: 
				[
					{ value: "Cookware & Bakeware" },
					{ value: "Cutlery" },
					{ value: "Kitchen Appliances & Electrics", displayName: "Appliances & Electrics" },
					{ value: "Kitchen Accessories" }
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
			}
		];

		return settings;
	});
'use strict';

angular.module('groupByDemo.util.settings', [])
	.service('settingsService', function(){

		var settings = this;

		settings.search = {
			clientKey : "269466c6-e7b6-4439-a175-c6d5faa069dd",
			collection : "productsonsale",
			area : "Test",
			pageSize : 50,
			fields : ["ID", "wideImage", "Ctitle", "price" , "on_sale"]
		};

		settings['Nav Menu Defaults'] = {
			menuNavigationName : "QtopRatedType",
			subMenuNavigationName : "Qtype",
			menuSize : 5

		};
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
		settings.Personalization = {
			Status : "on"
		};

		settings.Sorting = [
	        {'display': 'Relevancy', 			'field': '_relevance', 	'order' : 'Descending'},
	        {'display': 'Price - Low to High', 	'field': 'price', 		'order' : 'Ascending'},
	        {'display': 'Price - High to Low', 	'field': 'price', 		'order' : 'Descending'},
	        {'display': 'Rating', 				'field': 'Qrating', 	'order' : 'Descending'}
	    ];

		settings['Color Mapping'] = {
			"Red" : "#F00",
			"Green" : "#F00",
			"Blue" : "#F00"
		};

		return settings;
	});
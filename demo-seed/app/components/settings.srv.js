'use strict';

angular.module('groupByDemo.util.settings', [])
	.service('settingsService', function(){

		var settings = this;

		settings['SAYT Display Fields'] = {
			image : "image_url",
			title : "title",
			price : "price",
			id : "ID"
		};

		settings['Display Fields'] = {
			image : "wideImage",
			title : "Ctitle",
			price : "price",
			id : "ID"
		};

		var getValuesFromObj = function(obj){
			var values = [];
			Object.keys(obj).forEach( function(key) {
				values.push( obj[key] );
			});
			return values;
		};

		settings.getNames = function( settingsObj ){
			return getValuesFromObj(settingsObj);
		};

		//add any additional fields to return here:
		var searchFields = settings.getNames(settings['Display Fields']).concat(["on_sale"]);

		settings.search = {
			clientKey : "269466c6-e7b6-4439-a175-c6d5faa069dd",
			collection : "productsonsale",
			area : "Test",
			pageSize : 50,
			saytURL : "http://crateandbarreldemo.groupbycloud.com",
			fields : searchFields,
			saytKeywords : 5,
			saytNavigation : 4,
			saytProducts : 3
		};

		settings['Nav Menu Defaults'] = {
			menuNavigationName : "QtopRatedType",
			subMenuNavigationName : "Qtype",
			menuSize : 5,
			numberOfPreviewImages : 8
		};

		settings['SEO-Friendly URL'] = {
			q : { type : "search" },
			c : { type : "navigation" , displayName: "Sub Category",  value: "Qtype" },
			d : { type : "navigation" , displayName: "Category", value: "QtopRatedType" },
			f : { type : "navigation" , displayName: "Color", value: "Qcolor" },
			b : { type : "navigation" , displayName: "Brand", value: "CBrand" }
		};

		settings['URL Parameter Ordering'] = [ "QtopRatedType", "Qcolor", "CBrand", "Qtype" ];

		settings['Nav Menu'] = [
			{ displayName: "Dining & Entertaining", searchTerm: "dining", submenu: 
				[
					{ value: "Dinnerware" },
					{ value: "Flatware" },
					{ value: "Drinkware" },
					{ value: "Serveware" }
				]
			},
			{ displayName: "Kitchen", searchTerm: "Kitchen",  submenu: 
				[
					{ value: "Cookware & Bakeware" },
					{ value: "Cutlery" },
					{ value: "Kitchen Appliances & Electrics", displayName: "Appliances & Electrics" },
					{ value: "Kitchen Accessories", displayName: "Accessories" }
				]
			},
			{ displayName: "Decor & Pillows", searchTerm: "decor", submenu: 
				[
					{ value: "Pillows & Throws" },
					{ value: "Candle Holders & Vases" },
					{ value: "Wall Decor & Mirrors" },
					{ value: "Home Accessories" }
				]
			},
			{ navigationName: "QtopRatedType", searchTerm: "lighting",
				value: "Lighting", 
				displayName: "Lighting", 
				menuField: "Qtype",
			},
			{ displayName: "Bed & Bath", searchTerm: "bedroom", submenu: 
				[
					{ value: "Bedding" },
					{ value: "Bath" },
				]
			},
			{ displayName: "Outdoor", searchTerm: "grill", submenu: 
				[
					{ value: "Outdoor Entertaining", displayName: "Entertaining" },
					{ value: "Outdoor Accessories", displayName: "Accessories" },
					{ value: "Outdoor Dining Furniture", displayName: "Dining" }
				]
			},	
		];
		settings.Personalization = {
			Status : "on",
			Fields : ["CBrand"]
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
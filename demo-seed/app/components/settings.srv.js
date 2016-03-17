'use strict';

angular.module('groupByDemo.util.settings', [])
	.service('settingsService', ['CONST', '_', function(CONST, _ ){

		var settings = this;

		settings['SAYT Display Fields'] = {
			image : "product_images",
			title : "title",
			brand : "brand",
			url : "url"
		};

		settings['Display Fields'] = {
			image : "product_images",
			title : "title",
			brand : "brand",
			url : "url"
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
			clientKey : "e2c1781d-60c0-43d1-ae77-23c7386d325b",
			collection : "shoppingchannel",
			area : "Production",
			pageSize : 50,
			saytURL : "https://tscpoc.groupbycloud.com",
			fields : searchFields,
			saytKeywords : 5,
			saytNavigation : 4,
			saytProducts : 3,
			saytScopedKeywordField : "QtopRatedType",
			saytNavigationFields: [ { displayName: "Brands", value: "CBrand", limit: 3}, { displayName: "Departments", value: "QtopRatedType", limit:3} ]
		};

		settings['Nav Menu Defaults'] = {
			menuNavigationName : "QtopRatedType",
			subMenuNavigationName : "Qtype",
			menuSize : 5,
			numberOfPreviewImages : 8
		};

		settings['SEO-Friendly URL'] = {
			q : { component : CONST.search.component.query },
			c : { component : CONST.search.component.navigation , navType : CONST.nav.type.value, displayName: "Sub Category",  value: "Qtype" },
			d : { component : CONST.search.component.navigation , navType : CONST.nav.type.value, displayName: "Category", value: "QtopRatedType" },
			f : { component : CONST.search.component.navigation , navType : CONST.nav.type.value, displayName: "Color", value: "Qcolor" },
			b : { component : CONST.search.component.navigation , navType : CONST.nav.type.value, displayName: "Brand", value: "CBrand" },
			r : { component : CONST.search.component.navigation , navType : CONST.nav.type.range, displayName: "Rating", value: "Qrating" },
			p : { component : CONST.search.component.navigation , navType : CONST.nav.type.range, displayName: "Price", value: "price" }
		};

		settings.searchChar = function(){
			var map = settings['SEO-Friendly URL'];
			var key = _.findKey( map, ['component', CONST.search.component.query ]);
			return key ? key : "";
		};
		settings.navToChar = function(navigationFieldName){
			var map = settings['SEO-Friendly URL'];
			var key = _.findKey( map, ['value', navigationFieldName ]);
			return key ? key : "";
		};

		settings['URL Parameter Ordering'] = [ "QtopRatedType", "Qcolor", "CBrand", "Qtype", "Qrating" ,"price" ];

		settings['Nav Menu'] = [
			{ displayName: "Jewellery", searchTerm: "jewellery", submenu: 
				[
					{ value: "Products" },
					{ value: "Brands" },
					{ value: "Quick Links" },
					{ value: "Special Pricing" }
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
			"ivory" 	: "#FFFFF0" ,
			"tan" 		: "#D2B48C" ,
			"silver" 	: "#C0C0C0" ,
			"brown" 	: "#A52A2A" ,
			"black" 	: "#000" ,
			"metallic" 	: "url('assets/metallic.png')" ,
			"white" 	: "#FFF" ,
			"yellow" 	: "#FF0" ,
			"grey" 		: "#D3D3D3" ,
			"clear" 	: "url('assets/clear.png')" ,
			"green" 	: "#008000" ,
			"red" 		: "#F00" ,
			"multi-colored" : "url('assets/multicolor.png')" ,
			"blue" 		: "#00F" ,
			"purple" 	: "#800080" ,
			"orange" 	: "#FFA500" ,
			"teal" 		: "#008080" ,
			"bronze" 	: "#CD7F32" ,
			"aqua" 		: "#0FF" ,
			"pink" 		: "#FFC0CB" ,
			"copper" 	: "#B87333" ,
			"natural" 	: "#FFFAF0" ,
			"brass" 	: "#B5A642" ,
			"gold" 		: "url('assets/gold.png')"
		};

		settings.colorNameToStyle = function(colorName){
			var hexOrImage = settings['Color Mapping'][colorName.toLowerCase()];

			if(!hexOrImage)
				return { "background-color" : "none" };

			if(_.startsWith(hexOrImage, "url")){
				return { 'background-image' : hexOrImage, 'background-repeat' : 'no-repeat' };
			} else {
				return { "background-color" : hexOrImage, 'border-color' : '#ddd' };
			}
		};

		return settings;
	}]);
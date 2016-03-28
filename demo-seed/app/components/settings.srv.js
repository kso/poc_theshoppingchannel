'use strict';

angular.module('groupByDemo.util.settings', [])
	.service('settingsService', ['CONST', '_', function(CONST, _ ){

		var settings = this;

		settings['SAYT Display Fields'] = {
			image : "product_images",
			product_type : "product_type",
			title : "title",
			brand : "brand",
			url : "url",
			item_number: "p_item_number"
		};

		settings['Display Fields'] = {
			image : "product_images",
			product_type : "product_type",
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
			saytProducts : 9,
			saytScopedKeywordField : "product_type",
			saytNavigationFields: [ { displayName: "Brands", value: "brand", limit: 3}, { displayName: "Product Types", value: "product_type", limit:3} ],
			liveSiteRoot: "https://www.theshoppingchannel.com"
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
					{ value: "Beads & Charms" },
					{ value: "Bracelets" },
					{ value: "Brooches" },
					{ value: "Earrings" },
					{ value: "Jewellery Sets" },
					{ value: "Men's Jewellery" },
					{ value: "Necklaces" },
				]
			},
			{ displayName: "Beauty", searchTerm: "Beauty",  submenu: 
				[
					{ value: "Bath & Body" },
					{ value: "Makeup" },
					{ value: "Hair Care" },
					{ value: "Nails" }
				]
			},
			{ displayName: "Fashion", searchTerm: "decor", submenu: 
				[
					{ value: "Accessories" },
					{ value: "Activewear" },
					{ value: "Benchwear" },
					{ value: "Bottoms" }
				]
			},
			{ displayName: "Handbags & Shoes", searchTerm: "shoes", submenu: 
				[
					{ value: "Handbags" },
					{ value: "Girls' Shoes" },
					{ value: "Women's Shoes" },
					{ value: "Boys' Shoes" },
					{ value: "Men's Shoes" }
				]
			},
			{ displayName: "Home", searchTerm: "bed", submenu: 
				[
					{ value: "Bath" },
					{ value: "Bedding" },
					{ value: "Pilow" },
					{ value: "Furniture" }
				]
			},	
			{ displayName: "Kitchen", searchTerm: "kitchen", submenu: 
				[
					{ value: "Baking" },
					{ value: "Kitchen Accessories" },
					{ value: "Food Storage" }
				]
			},
			{ displayName: "Electronics", searchTerm: "Tablets accessories", submenu: 
				[
					{ value: "Tablets & Accessories"},
					{ value: "Computers & Accessories"},
					{ value: "Phones & Accessories"}
				]
			},
			{ displayName: "NHL Shop", searchTerm: "nhl jersey", submenu: 
				[
					{ value: "Toronto Maple Leafs"},
					{ value: "Montreal Canadiens"},
					{ value: "Vancouver Canucks"},
					{ value: "Ottawa Senators"},
					{ value: "Edmonton Oilers" }
				]
			},
			{ displayName: "Clearance", searchTerm: "Clearance", submenu: []
			},
			{ displayName: "More", searchTerm: "vitamin", submenu: []
			}
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
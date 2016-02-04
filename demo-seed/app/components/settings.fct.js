
angular.module('groupByDemo.shared', [])
	.factory('settingsService', function(){
		var settings = {};

		settings['Primary Nav'] = [
			{ name: "Kitchen", sub_nav: 
				[
					{ section_name: "Cookware & Bakeware" },
					{ section_name: "Cutlery" },
					{ section_name: "Appliances & Electrics" },
					{ section_name: "Kitchen & Accessories" }
				]
			},
			{ name: "Decor & Pillows", sub_nav: 
				[
					{ section_name: "Cookware & Bakeware" },
					{ section_name: "Cutlery" },
					{ section_name: "Appliances & Electrics" },
					{ section_name: "Kitchen & Accessories" }
				]
			},
			{ name: "Lighting", sub_nav: 
				[
					{ section_name: "Cookware & Bakeware" },
					{ section_name: "Cutlery" },
					{ section_name: "Appliances & Electrics" },
					{ section_name: "Kitchen & Accessories" }
				]
			},
			{ name: "Bed & Bath", sub_nav: 
				[
					{ section_name: "Cookware & Bakeware" },
					{ section_name: "Cutlery" },
					{ section_name: "Appliances & Electrics" },
					{ section_name: "Kitchen & Accessories" }
				]
			}
		];

		return settings;
	});
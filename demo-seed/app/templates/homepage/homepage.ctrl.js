'use strict';

angular.module('groupByDemo.templates', [])
	.controller('homepageCtrl', [ 'apiService', 'sharedData', function(apiService, sharedData){

		var vm = this;

		sharedData.query = "";

		vm.zonemapping = ["TL","TM"];//,"TR","BL","BM","BR"];

		var today = new Date().toJSON();
		var fullYear = today.slice(0,4);
		var year = today.slice(2,4);
		var month = today.slice(5,7);
		var day = today.slice(8,10);
		var todaySpecial = "https://src.tscimg.ca/Content/en_CA/Images/Category/Homepage/" + fullYear +"/" + month + "/" + day + "/HP_MN1_" + year + month + day +".jpg";
		var pastSpecials = [];

		// https://src.tscimg.ca/Content/en_CA/Images/Category/Homepage/2016/03/21/HP_BNR_160321.jpg

		for(var i=0;i<3; i++) {
			day--;
			if(day < 0) {
				day = 28;
				month--;
			}
			pastSpecials.push("https://src.tscimg.ca/Content/en_CA/Images/Category/Homepage/" + fullYear +"/" + month + "/" + day + "/HP_MN1_" + year + month + day +".jpg");
		}
		console.log(todaySpecial);
		console.log(pastSpecials);
		
		var parameters = {
			pageSize : 0,
			query : "",
			customUrlParams: [ { key: "page", value: "home" } ] ,
			fields : "",
		};

		  	console.time("search");
	  	apiService.search(parameters).success(function(data){
	  		console.timeEnd("search");

	  		vm.content = data.template.zones;

	  		vm.todaySpecial = todaySpecial;
	  		vm.pastSpecials = pastSpecials;

			console.log(data);
		});

	}]);
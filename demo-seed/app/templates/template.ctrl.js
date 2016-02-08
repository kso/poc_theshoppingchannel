'use strict';

angular.module('groupByDemo.templates')
	.controller('templateCtrl', [ function(){

		//here we can take the template name and map it to the property html template
		var vm = this; 

		vm.mapTemplateName = function( commandCenterName ) {

			if(commandCenterName = "Product Spotlight"){
				return "featureditems";
			}

			return commandCenterName;

		}
		console.log("loading langing page ctrl");

	}]);
'use strict';

angular.module('groupByDemo.templates')
	.controller('templateCtrl', [ function(){

		//here we can take the template name and map it to the property html template
		var vm = this; 

		vm.mapTemplateName = function( commandCenterName ) {

			if(commandCenterName === "Product Spotlight"){
				return "featureditems";
			}

			if(commandCenterName === "No Results"){
				return "noresults";
			}

			return commandCenterName;

		};

	}]);
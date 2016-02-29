'use strict';

angular.module("groupByDemo.gbc.personalization",['ngCookies'])
	.service('personalizationService', ['$cookies', 'merchandisingService', function ($cookies, merchandisingService) {

		var service = this; 

		service.getBiasStrength = function( strength ){

			if(strength > 10)
				return "Absolute_Increase";
			if(strength > 7)
				return "Strong_Increase";
			if(strength > 5)
				return "Medium_Increase";
			if(strength > 2)
				return "Weak_Increase";

			return "Leave_Unchanged";

		};

		service.applyProfile = function( query, nav ){
			var profile = {};
			profile.bringToTop = merchandisingService.getBringToTop( query, nav );
			profile.augmentBiases = true;
			profile.biases = [];

			var max_strength = 0;
			var affinityProfile = $cookies.getObject("profile");

			if(affinityProfile === undefined && profile.bringToTop.length === 0)
				return null;

			angular.forEach(affinityProfile, function(affinity, name){
				angular.forEach(affinity, function(strength, content){
					profile.biases.push( { 
						name : name, 
						content: content, 
						strength : service.getBiasStrength(strength) } );
					max_strength = Math.max(max_strength, strength); 
				});
			});

			profile.influence = Math.min(max_strength, 10);

			return profile;
		};

		service.recordProfileEvent = function( type, value ){

			console.log("recording Affinity Event "  + type + " " + value );

			var affinity = $cookies.getObject("profile");
			affinity = affinity ? affinity : {};

			affinity[type] = affinity[type] ? affinity[type] : {};
			affinity[type][value] = affinity[type][value] ? affinity[type][value] + 1 : 1;
			$cookies.putObject("profile", affinity);
		};

	}]);

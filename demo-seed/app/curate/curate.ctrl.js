'use strict';

angular.module('groupByDemo.curate', ['ui.bootstrap'])
	.controller('curateCtrl', ['apiService', 'settingsService', 'semanticSearchService' ,'$uibModalInstance', 'id', 'position',
		function(apiService, settingsService, semanticSearchService, $uibModalInstance, id, position){

			var vm = this;
			vm.id = id;
			vm.position = position;
			vm.moveto = position;
			vm.searchText = "";
			vm.results = [];
			vm.selected = undefined;
			vm.displayFields = settingsService['Display Fields'];

			vm.search = function () {

				var parameters = {
					skip : 0,
					pageSize : 12,
					query : vm.searchText,
					fields: settingsService.search.fields
				};

				var filterInterpretation = semanticSearchService.interpretFilter( vm.searchText );
				parameters.query = filterInterpretation.query;
				parameters.refinements = filterInterpretation.refinements;

				apiService.search(parameters).then(function(response){
					vm.results = response.data.records;
				});
			};


			vm.ok = function () {
			  	$uibModalInstance.close( 
			  		{ 
			  			id : vm.selected ? vm.selected.allMeta.id : id,
			  			position: vm.moveto
			  		});
			};

			vm.cancel = function() {
				$uibModalInstance.dismiss('cancel');
			};

			console.log(vm);

	}]);
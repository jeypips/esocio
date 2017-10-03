angular.module('sector-data',[]).factory('sectors',function($http) {

	return new function() {
		
		var self = this;
		
		this.load = function(scope) {
			
			scope.data = {};
			scope.data.sectors = [];
			
			$http({
			  method: 'POST',
			  url: 'handlers/sectors-structures.php'
			}).then(function mySucces(response) {
				
				scope.data.sectors = angular.copy(response.data);
				
			}, function myError(response) {
				 
			  // error
				
			});
			
		};
		
	};

});
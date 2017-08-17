angular.module('macros-module',['bootstrap-modal']).factory('form', function($compile,$timeout,$http,bootstrapModal) {
	
	function form() {
		
		var self = this;
		
		self.data = function(scope) { // initialize data			
			
			scope.formHolder = {};		

			scope.macros = {};
			scope.macros.macros_id = 0;

			scope.macros = []; // list

		};

		function validate(scope) {
			
			var controls = scope.formHolder.macros.$$controls;
			
			angular.forEach(controls,function(elem,i) {
				
				if (elem.$$attr.$attr.required) elem.$touched = elem.$invalid;
									
			});

			return scope.formHolder.macros.$invalid;
			
		};
		
		
		/* self.filter = function(scope,filter) {				
			
			blockUI.show('Please wait');			
			
			scope.filter.by = filter;
			
			$http({
			  method: 'POST',
			  url: 'handlers/profile-filter.php',
			  data: {filter: scope.filter.by}
			}).then(function mySucces(response) {
				
				scope.filter.filters = response.data;
				scope.filter.label = response.data[0];
				self.filterGo(scope);
				
			}, function myError(response) {
				 
			  // error
				
			});				
			
		}; */
		
		
		
		
		

		self.physical = function(scope,row) {			
			
			scope.macros = {};
			scope.macros.macros_id = 0;

			$('#x_content').html('Loading...');
			$('#x_content').load('forms/physical.html',function() {
				$timeout(function() { $compile($('#x_content')[0])(scope); },200);
			});
			
			if (row != null) {		
				
				if (scope.$id > 2) scope = scope.$parent;				
				$http({
				  method: 'POST',
				  url: 'handlers/physical-view.php',
				  data: {macros_id: row.macros_id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.macros);
					
				}, function myError(response) {
					 
				  // error
					
				});					
			};
			
		};
		
		self.save = function(scope) {
			
			if (validate(scope)) return;
			
			$http({
			  method: 'POST',
			  url: 'handlers/physical-save.php',
			  data: {macros: scope.macros}
			}).then(function mySucces(response) {
				
				if (scope.macros.macros_id == 0) scope.macros.macros_id = response.data;

				
				$timeout(function() { self.list(scope); },200);
				
			}, function myError(response) {
				 
			  // error
				
			});			
			
		};		
		
		self.delete = function(scope,row) {
			
		var onOk = function() {
			
			if (scope.$id > 2) scope = scope.$parent;			
			
			$http({
			  method: 'POST',
			  url: 'handlers/physical-delete.php',
			  data: {macros_id: [row.macros_id]}
			}).then(function mySucces(response) {

				self.list(scope);
				
			}, function myError(response) {
				 
			  // error
				
			});

		};

		bootstrapModal.confirm(scope,'Confirmation','Are you sure you want to delete this record?',onOk,function() {});
			
		};
		
		self.list = function(scope) {
			
			// load list
			scope.macro = {};
			scope.macro.macros_id = 0;			
			$http({
			  method: 'POST',
			  url: 'handlers/physical-list.php',
			}).then(function mySucces(response) {
				
				scope.macros = response.data;
				
			}, function myError(response) {
				 
			  // error
				
			});
			//

			$('#x_content').html('Loading...');
			$('#x_content').load('lists/physical.html', function() {
				$timeout(function() { $compile($('#x_content')[0])(scope); },100);								
				// instantiate datable
				$timeout(function() {
					$('#physical').DataTable({
						"ordering": false
					});	
				},200);
				
			});				
			
		};
		
	};
	
	return new form();
	
});
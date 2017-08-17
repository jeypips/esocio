angular.module('physicals-module',['bootstrap-modal']).factory('form', function($compile,$timeout,$http,bootstrapModal) {
	
	function form() {
		
		var self = this;
		
		self.data = function(scope) { // initialize data			
			
			scope.formHolder = {};		

			scope.physical_characteristics = {};
			scope.physical_characteristics.pc_id = 0;

			scope.physicals = []; // list

		};

		function validate(scope) {
			
			var controls = scope.formHolder.physical_characteristics.$$controls;
			
			angular.forEach(controls,function(elem,i) {
				
				if (elem.$$attr.$attr.required) elem.$touched = elem.$invalid;
									
			});

			return scope.formHolder.physical_characteristics.$invalid;
			
		};

		self.physical = function(scope,row) {			
			
			scope.physical_characteristics = {};
			scope.physical_characteristics.pc_id = 0;

			$('#x_content').html('Loading...');
			$('#x_content').load('forms/physical.html',function() {
				$timeout(function() { $compile($('#x_content')[0])(scope); },200);
			});
			
			if (row != null) {		
				
				if (scope.$id > 2) scope = scope.$parent;				
				$http({
				  method: 'POST',
				  url: 'handlers/physical-view.php',
				  data: {pc_id: row.pc_id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.physical_characteristics);
					
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
			data: {physical_characteristics: scope.physical_characteristics}
			}).then(function mySucces(response) {
				
				if (scope.physical_characteristics.pc_id == 0) scope.physical_characteristics.pc_id = response.data;
				
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
			  data: {pc_id: [row.pc_id]}
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
			scope.physical = {};
			scope.physical.pc_id = 0;			
			$http({
			  method: 'POST',
			  url: 'handlers/physical-list.php',
			}).then(function mySucces(response) {
				
				scope.physicals = response.data;
				
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
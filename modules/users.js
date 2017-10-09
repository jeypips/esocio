angular.module('user-module',['bootstrap-modal','bootstrap-growl']).factory('form', function($compile,$timeout,$http,bootstrapModal,growl) {
	
	function form() {
		
		var self = this;
		
		var loading = '<div class="col-sm-offset-4 col-sm-8"><button type="button" class="btn btn-inverse" title="Loading" disabled><i class="fa fa-spin fa-refresh"></i>&nbsp; Please wait...</button></div>';
		
		self.data = function(scope) { // initialize data	
		
			scope.controls = {
				ok: {
					btn: false,
					label: 'Save'
				},
				cancel: {
					btn: false,
					label: 'Cancel'
				},
			};			

			scope.account_info = {};
			scope.notification = {};
			scope.account_info.account_id = 0;
			scope.notification.id = 0;

			scope.account_infos = []; // list
			scope.notifications = []; // list

		};

		function validate(scope) {
			
			var controls = scope.formHolder.account_info.$$controls;
			
			angular.forEach(controls,function(elem,i) {
				
				if (elem.$$attr.$attr.required) elem.$touched = elem.$invalid;
									
			});
			return scope.formHolder.account_info.$invalid;
			
		};
		
		function mode(scope,row) {
			
			if (row == null) {
				scope.controls.ok.label = 'Save';
				scope.controls.ok.btn = false;
				scope.controls.cancel.label = 'Cancel';
				scope.controls.cancel.btn = false;
			} else {
				scope.controls.ok.label = 'Update';
				scope.controls.ok.btn = true;
				scope.controls.cancel.label = 'Close';
				scope.controls.cancel.btn = false;				
			}
			
		};

		self.user = function(scope,row) {			
		
			scope.account_info = {};
			scope.account_info.account_id = 0;
			
			mode(scope,row);

			$('#x_content').html(loading);
			$('#x_content').load('forms/user.html',function() {
				$timeout(function() { $compile($('#x_content')[0])(scope); },200);
			});
		
			
			if (row != null) {	
			
				if (scope.$account_id > 2) scope = scope.$parent;				
				$http({
				  method: 'POST',
				  url: 'handlers/user-view.php',
				  data: {account_id: row.account_id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.account_info);
					
					
				}, function myError(response) {
					 
				  // error
					
				});					
			};
		};
		
		
		self.edit = function(scope) {
			
			scope.controls.ok.btn = !scope.controls.ok.btn;
			
		};
		
		self.save = function(scope) {
			
			if (validate(scope)) return;
			
			$http({
			  method: 'POST',
			  url: 'handlers/user-save.php',
			  data: {account_info: scope.account_info}
			}).then(function mySucces(response) {
				
				if (scope.account_info.account_id == 0) scope.account_info.account_id = response.data;
				mode(scope,scope.account_info);
				
			}, function myError(response) {
				 
			  // error
				
			});			
			
		};		
		
		self.delete = function(scope,row) {
			
		var onOk = function() {
			
			if (scope.$id > 2) scope = scope.$parent;			
			
			$http({
			  method: 'POST',
			  url: 'handlers/user-delete.php',
			  data: {account_id: [row.account_id]}
			}).then(function mySucces(response) {

				self.list(scope);
				
			}, function myError(response) {
				 
			  // error
				
			});

		};

		bootstrapModal.confirm(scope,'Confirmation','Are you sure you want to delete this record?',onOk,function() {});
			
		};		
		
		/* self.filter = function(scope,filter) {				
					
			scope.filter.by = filter;
			
			$http({
			  method: 'POST',
			  url: 'handlers/filter.php',
			  data: {filter: scope.filter.by}
			}).then(function mySucces(response) {
				
				scope.filter.filters = response.data;
				scope.filter.label = response.data[0];
				self.filterGo(scope);
				
			}, function myError(response) {
				 
			  // error
				
			});				
			
		}; */
		
		
		self.list = function(scope) {
			
			// load list
			scope.account_info = {};
			scope.account_info.account_id = 0;			
			$http({
			  method: 'POST',
			  url: 'handlers/user-list.php',
			}).then(function mySucces(response) {
				
				scope.account_infos = response.data;
				
			}, function myError(response) {
				 
			  // error
				
			});
			//

			$('#x_content').html(loading);
			$('#x_content').load('lists/users.html', function() {
				$timeout(function() { $compile($('#x_content')[0])(scope); },100);								
				// instantiate datable
				$timeout(function() {
					$('#user-list').DataTable({
						"ordering": false
					});	
				},200);
				
			});
		};
		
		self.notif = function(scope) {
			$('#x_content').html(loading);
			$('#x_content').load('notifs.html', function() {
				$timeout(function() { $compile($('#x_content')[0])(scope); },100);								
			});
		};
	};
	
	return new form();
	
});
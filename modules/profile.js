angular.module('profile-module',['bootstrap-modal']).factory('form', function($compile,$timeout,$http,bootstrapModal) {
	
	function form() {
		
		var self = this;
		
		var loading = '<div class="col-sm-offset-4 col-sm-8"><button type="button" class="btn btn-inverse" title="Loading" disabled><i class="fa fa-spin fa-refresh"></i>&nbsp; Please wait...</button></div>';
		
		self.data = function(scope) { // initialize data	
		
			scope.views.menu = false;		
		
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

			scope.profile = {};
			scope.profile.profile_id = 0;

			scope.profiles = []; // list
			
			scope.sector_parameter = {};
			scope.sector_parameters = [];

			scope.views.subMenu = 0;

		};

		function validate(scope,form) {
			
			var controls = scope.formHolder[form]['$$controls'];
			
			angular.forEach(controls,function(elem,i) {
				
				if (elem.$$attr.$attr.required) elem.$touched = elem.$invalid;
									
			});

			return scope.formHolder[form]['$invalid'];
			
		};			
		

		self.profile = function(scope,row) {		
			
			scope.profile = {};
			scope.profile.profile_id = 0;

			$('#x_content').html(loading);
			$('#x_content').load('forms/profile.html',function() {
				$timeout(function() { $compile($('#x_content')[0])(scope); },200);
			});
			
			scope.controls.ok.label = 'Save';
			scope.controls.ok.btn = false;
			scope.controls.cancel.label = 'Cancel';
			scope.controls.cancel.btn = false;
			
			if (row != null) {		
				
				scope.controls.ok.label = 'Update';
				scope.controls.ok.btn = true;
				scope.controls.cancel.label = 'Close';
				scope.controls.cancel.btn = false;

				if (scope.$profile_id> 2) scope = scope.$parent;				

				$http({
				  method: 'POST',
				  url: 'handlers/profile-view.php',
				  data: {profile_id: row.profile_id}
				}).then(function mySucces(response) {
					
					angular.copy(response.data, scope.profile);
					
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
			  url: 'handlers/profile-save.php',
			  data: {profile: scope.profile}
			}).then(function mySucces(response) {
				
				if (scope.profile.profile_id == 0) scope.profile.profile_id = response.data;

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
			  url: 'handlers/profile-delete.php',
			  data: {profile_id: [row.profile_id]}
			}).then(function mySucces(response) {

				self.list(scope);
				
			}, function myError(response) {
				 
			  // error
				
			});

		};

		bootstrapModal.confirm(scope,'Confirmation','Are you sure you want to delete this record?',onOk,function() {});
			
		};
		
		function filter(scope) {
	
			$http({
			  method: 'POST',
			  url: 'handlers/sector-filter-list.php',
			}).then(function mySucces(response) {
				
				angular.copy(response.data, scope.sector_filters);
				
			}, function myError(response) {
				 
			  // error
				
			});		
			
		};
		
		self.filter_sector_parameters = function(scope,sector_id) {

			$http({
			  method: 'POST',
			  url: 'handlers/sector-parameters.php',
			  data: {sector_id: sector_id}
			}).then(function mySucces(response) {
				
				angular.copy(response.data, scope.sector_parameters);
				
			}, function myError(response) {
				 
			  // error
				
			});				
			
		};		
		
		/* self.filterGo = function(scope,filter) {				
			
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
		
		self.list = function(scope) {
			
			// load list
			scope.mode = 'list';
			scope.profile = {};
			scope.profile.profile_id = 0;			
			$http({
			  method: 'POST',
			  url: 'handlers/profile-list.php',
			}).then(function mySucces(response) {
				
				scope.profiles = response.data;
				
			}, function myError(response) {
				 
			  // error
				
			});
			//

			$('#x_content').html(loading);
			$('#x_content').load('lists/profiles.html', function() {
				$timeout(function() { $compile($('#x_content')[0])(scope); },100);								
				// instantiate datable
				$timeout(function() {
					$('#profile').DataTable({
						"ordering": false
					});	
				},200);
				
			});

			filter(scope);
			self.filter_sector_parameters(scope,0);			
			
		};
		
		self.subMenu = function(scope) {			
				
			var off = '0px';
			var on = '240px';
			
			var tog = (scope.views.subMenu == 0)?on:off;
			scope.views.subMenu = (scope.views.subMenu == 0)?240:0;

			$("#sub-menu").animate({right: tog}, "fast");
			
		};
		
	};
	
	return new form();
	
});
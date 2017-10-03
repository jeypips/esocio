angular.module('profile-module',['bootstrap-modal','bootstrap-growl','sector-data']).factory('form', function($compile,$timeout,$http,bootstrapModal,growl,sectors) {
	
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

			scope.views.subMenu = 0;
			
			scope.subMenuList = {
				profile: false
			};	
			
			$http({
				method: 'POST',
				url: 'handlers/sector-list.php'
			}).then(function mySucces(response) {
				
				scope.sectors = response.data;
				
				angular.forEach(response.data, function(item,i) {
					scope.subMenuList[item.short_name] = false;
				});
				
			}, function myError(response) {
				
			});

			sectors.load(scope);
			
			$timeout(function() {
				console.log(scope.data.sectors);
			},500);
			
		};

		function validate(scope,form) {
			
			var controls = scope.formHolder[form]['$$controls'];
			
			angular.forEach(controls,function(elem,i) {
				
				if (elem.$$attr.$attr.required) elem.$touched = elem.$invalid;
									
			});

			return scope.formHolder[form]['$invalid'];
			
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
		
		function sector(scope,form) {
			
			var sector = null;
			
			angular.forEach(scope.data.sectors, function(item,i) {
				
				if (form == item.shortname) sector = item;
				
			});
			
			return sector;
			
		};
		
		self.activateForm = function(scope,form,row) {
			
			if (form != 'profile') {
				if (scope.$parent.profile.profile_id == 0) {
					growl.show('btn btn-danger',{from: 'top', amount: 55},'Please finish Basic Profile form before proceeding to other forms');
					// return;
				};
			};
			
			angular.forEach(scope.subMenuList, function(item,i) {
				scope.subMenuList[i] = false;
			});
			
			scope.subMenuList[form] = true;

			scope.views.menu = true;
			
			mode(scope,row);
			
			/*
			** data structures
			*/
			
			scope.profile = {};
			scope.profile.profile_id = 0;
			
			scope.profile.sectors = {};
			
			if (form != 'profile') {
				// console.log(sector(scope,form));
				scope.profile.sectors[form] = angular.copy(sector(scope,form));
				console.log(scope.profile.sectors);
			};
			
			/*
			**
			*/
			
			$('#x_content').html(loading);
			$('#x_content').load('forms/'+form+'.html',function() {
				$timeout(function() { $compile($('#x_content')[0])(scope); },200);
			});
			
			if (row != null) {

				if (scope.$id> 2) scope = scope.$parent;				

				$http({
				  method: 'POST',
				  url: 'handlers/'+form+'-view.php',
				  data: {profile_id: row.profile_id}
				}).then(function mySucces(response) {
					
					scope.profile = angular.copy(response.data);
					
				}, function myError(response) {
					 
				  // error
					
				});
				
			};			
			
		};
		
		self.edit = function(scope) {
			
			scope.controls.ok.btn = !scope.controls.ok.btn;
			
		};
		
		self.save = function(scope,form) {
			
			if (validate(scope,form)) return;
			
			var url = null;
			
			switch (form) {
				
				case "profile":
				
					$http({
					  method: 'POST',
					  url: 'handlers/profile-save.php',
					  data: {profile: scope.profile}
					}).then(function mySucces(response) {
						
						if (scope.profile.profile_id == 0) scope.profile.profile_id = response.data;
						
					}, function myError(response) {
						 
					  // error
						
					});					
				
				break;
				
				default:
					
					$http({
					  method: 'POST',
					  url: 'handlers/'+form+'-save.php',
					  data: scope.profile
					}).then(function mySucces(response) {
						
					}, function myError(response) {
						 
					  // error
						
					});	
					
				break;		
				
			}
			
			mode(scope,scope.profile);			
			
		};		
		
		self.delete = function(scope,row) {
			
			var onOk = function() {							
				
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
		
		self.list = function(scope) {
			
			scope.views.menu = false;			
			
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
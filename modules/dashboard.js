angular.module('dashboard-module',['bootstrap-modal','bootstrap-growl']).factory('form', function($compile,$timeout,$http,bootstrapModal,growl) {
	
	function form() {
		
		var self = this;
		
		var loading = '<div class="col-sm-offset-4 col-sm-8"><button type="button" class="btn btn-inverse" title="Loading" disabled><i class="fa fa-spin fa-refresh"></i>&nbsp; Please wait...</button></div>';
		
		self.data = function(scope) { // initialize data	
				
			scope.sectors = [];
			
			$timeout(function() {
			
				$http({
				  method: 'POST',
				  url: 'handlers/user-dashboard.php',
				  data: {account_name_municipality: scope.accountProfile.account_name_municipality}
				}).then(function mySucces(response) {

					scope.profile_id = response.data;

				}, function myError(response) {
					 
				  // error
					
				});	
			
			},100);
			
			$timeout(function() {
			
				$http({
				  method: 'POST',
				  url: 'handlers/profile-sectors.php',
				  data: {profile_id: scope.profile_id}
				}).then(function mySucces(response) {
					
					scope.sectors = angular.copy(response.data);
					
				}, function myError(response) {
					 
				  // error
					
				});
			
			},200);
			
			$timeout(function() {
				console.log(scope.sectors);
			},1000);
			
			$timeout(function() {
				
				var form = scope.accountProfile.groups;
			
				$('#x_content').html(loading);
				$('#x_content').load('dashboard/'+form+'.html',function() {
					$timeout(function() { $compile($('#x_content')[0])(scope); },500);
				});
				
			},300);
		
		};
		
	};
	
	return new form();
	
});
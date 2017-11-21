angular.module('dashboard-module',['bootstrap-modal','bootstrap-growl','flot-module', 'lineChart-module', 'landcharts-module']).factory('form', function($compile,$timeout,$http,bootstrapModal,growl,flot,lineChart,landcharts) {

	
	function form() {
		
		var self = this;
		
		var loading = '<div class="col-sm-offset-4 col-sm-8"><button type="button" class="btn btn-inverse" title="Loading" disabled><i class="fa fa-spin fa-refresh"></i>&nbsp; Please wait...</button></div>';
		
		self.data = function(scope) { // initialize data	
				
			scope.sectors = [];
			scope.consolidated = [];
			
			$timeout(function() {
			
				if (scope.accountProfile.groups == 'user') {			
			
					$http({
					  method: 'POST',
					  url: 'handlers/user-dashboard.php',
					  data: {account_name_municipality: scope.accountProfile.account_name_municipality}
					}).then(function mySucces(response) {

						scope.profile_id = response.data;

					}, function myError(response) {
						 
					  // error
						
					});
				
				}
			
			},100);
		
			$timeout(function() {
				
				if (scope.accountProfile.groups == 'user') {
				
					$http({
					  method: 'POST',
					  url: 'handlers/profile-sectors.php',
					  data: {profile_id: scope.profile_id}
					}).then(function mySucces(response) {
						
						scope.sectors = angular.copy(response.data);
						
					}, function myError(response) {
						 
					  // error
						
					});
				
				} else {
					
					$http({
					  method: 'POST',
					  url: 'handlers/consolidated-sectors.php'
					}).then(function mySucces(response) {
						
						scope.consolidated = angular.copy(response.data);
						
					}, function myError(response) {
						 
					  // error
						
					});
					
				}
			
			},200);
			
			$timeout(function() {
				
				if (scope.accountProfile.groups == 'user') {
				
					console.log(scope.sectors);					
					// pie chart
					flot.pie(scope.sectors);
				
				} else {
					
					console.log(scope.consolidated);				

					// pie chart
					lineChart.line(scope.consolidated);
					landcharts.pie(scope.consolidated);

				}
				
			},5000);
			
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
angular.module('dashboard-module',['bootstrap-modal','bootstrap-growl']).factory('form', function($compile,$timeout,$http,bootstrapModal,growl) {
	
	function form() {
		
		var self = this;
		
		var loading = '<div class="col-sm-offset-4 col-sm-8"><button type="button" class="btn btn-inverse" title="Loading" disabled><i class="fa fa-spin fa-refresh"></i>&nbsp; Please wait...</button></div>';
		
		self.data = function(scope) { // initialize data	
				
			scope.notification = {};
			scope.notification.id = 0;

			scope.notifications = []; // list

		};
		
		self.list = function(scope) {
			
			// load list
			scope.notification = {};
			scope.notification.id = 0;			
			$http({
			  method: 'POST',
			  url: 'handlers/notif-list.php',
			}).then(function mySucces(response) {
				
				scope.notifications = response.data;
				
			}, function myError(response) {
				 
			  // error
				
			});
		}
		
		self.notif = function(scope) {
			$('#x_content').html(loading);
			$('#x_content').load('notifs.html', function() {
				$timeout(function() { $compile($('#x_content')[0])(scope); },100);								
			});
		};
		
	};
	
	return new form();
	
});
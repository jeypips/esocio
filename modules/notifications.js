angular.module('notifications-module', []).directive('fetchNotifications',function($http,$interval) {
	
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {

		$interval(function() { fetchNotifications(scope); }, 1000);

		function fetchNotifications(scope) {
		
			$http({
			  method: 'POST',
			  url: 'handlers/notif-list.php'
			}).then(function mySucces(response) {
				
				scope.notifications = angular.copy(response.data);
				
			},
			function myError(response) {

			});
		
		};		
		
		}
	};

});
var app = angular.module('maintenance',['toggle-fullscreen','account-module','maintenance-module']);

app.controller('maintenanceCtrl',function($scope,fullscreen,manage) {
	
	$scope.views = {};

	manage.data($scope);
	manage.list($scope);
	
	$scope.manage = manage;

});
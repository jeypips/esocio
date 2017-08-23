var app = angular.module('maintenance',['toggle-fullscreen','account-module','maintenance-module','parameter-module']);

app.controller('maintenanceCtrl',function($scope,fullscreen,manage,param) {
	
	$scope.formHolder = {};
	$scope.formHolder = {};
	
	$scope.views = {};

	manage.data($scope);
	param.data($scope);
	
	manage.list($scope);
	param.list($scope);
	
	$scope.manage = manage;
	$scope.param = param;

});
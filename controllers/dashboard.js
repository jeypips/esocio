var app = angular.module('dashboard',['toggle-fullscreen','account-module','dashboard-module','notifications-module']);

app.controller('dashboardCtrl',function($scope,fullscreen,form) {
	
	$scope.formHolder = {};
	$scope.views = {};
	
	form.data($scope);
	
	$scope.form = form;

});
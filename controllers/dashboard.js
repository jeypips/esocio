var app = angular.module('dashboard',['toggle-fullscreen','account-module','dashboard-module']);

app.controller('dashboardCtrl',function($scope,fullscreen,form) {
	
	$scope.formHolder = {};
	$scope.views = {};
	
	form.data($scope);
	form.notif($scope);
	
	$scope.form = form;

});
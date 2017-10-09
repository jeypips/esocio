var app = angular.module('dashboard',['toggle-fullscreen','account-module','dashboard-module']);

app.controller('dashboardCtrl',function($scope,fullscreen) {
	
	$scope.formHolder = {};
	$scope.views = {};
	
	form.data($scope);
	form.notif($scope);
	
	$scope.fullscreen =  fullscreen;

});
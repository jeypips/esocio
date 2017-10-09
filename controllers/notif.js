var app = angular.module('notif',['toggle-fullscreen','account-module','notif-module']);

app.controller('notifCtrl',function($scope,fullscreen,form) {
	
	$scope.formHolder = {};
	$scope.views = {};
	
	form.data($scope);
	form.notif($scope);
	
	$scope.form = form;

});
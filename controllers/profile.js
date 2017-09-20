var app = angular.module('profile',['toggle-fullscreen','account-module','profile-module']);

app.controller('profileCtrl',function($scope,fullscreen,form) {
	
	$scope.formHolder = {};
	$scope.views = {};
	
	form.data($scope);
	form.list($scope);
	
	$scope.form = form;

});
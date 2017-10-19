var app = angular.module('user',['toggle-fullscreen','account-module','user-module','notifications-module']);

app.controller('userCtrl',function($scope,fullscreen,form) {
	
	$scope.formHolder = {};
	$scope.views = {};
	
	form.data($scope);
	form.list($scope);
	
	$scope.form = form;

});
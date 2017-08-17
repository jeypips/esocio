var app = angular.module('physicals',['toggle-fullscreen','account-module','physicals-module']);

app.controller('physicalCtrl',function($scope,fullscreen,form) {
	
	$scope.views = {};

	form.data($scope);
	form.list($scope);
	
	$scope.form = form;

});
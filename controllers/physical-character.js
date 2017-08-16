var app = angular.module('physicals',['toggle-fullscreen','account-module','physicals-module']);

app.controller('physicalCtrl',function($scope,fullscreen,form) {
	
	$scope.views = {};

	form.data($scope);
	form.list($scope);
	
	$scope.form = form;

	
	/*
	** initialization for filter			
	*/
	$scope.filter = {};
	$scope.filter.by = 'All';
	$scope.filter.filters = [{id: 0, label: "All"}];
	$scope.filter.label = {id: 0, label: "All"};

	
	
});
var app = angular.module('maintenance',['toggle-fullscreen','account-module','maintenance-module','parameter-module','parameterItem-module']);

app.controller('maintenanceCtrl',function($scope,fullscreen,manage,param,paramItem) {
	
	$scope.formHolder = {};
	
	$scope.views = {};

	manage.data($scope);
	param.data($scope);
	paramItem.data($scope);
	
	manage.list($scope);
	param.list($scope);
	paramItem.list($scope);
	
	$scope.manage = manage;
	$scope.param = param;
<<<<<<< HEAD
	$scope.paramItem = paramItem;
	 $scope.attributes = [];
  
  $scope.addNewAttribute = function() {
    var newItemNo = $scope.attributes.length+1;
    $scope.attributes.push({'id':'choice'+newItemNo});
  };
    
  $scope.removeAttribute = function() {
    var lastItem = $scope.attributes.length-1;
    $scope.attributes.splice(lastItem);
  };
=======
	$scope.paramItem = paramItem;	
>>>>>>> refs/remotes/origin/jp

});
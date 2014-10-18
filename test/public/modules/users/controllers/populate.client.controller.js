'use strict';

angular.module('users').controller('PopulateController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
    	$scope.authentication = Authentication;
    	if($scope.authentication.user.admin){
            $scope.applicantsList = [];
    	    $http.get('/populate').success(function(data, status, headers, config){
    		$scope.applicantList = data;
    	//khj
    	   }).error(function(data, status, headers, config){
    		$scope.error = status;
    	   });
        }
        else{
            $location.path('/badPermission');
        }

  }]);
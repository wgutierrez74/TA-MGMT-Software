'use strict';

angular.module('users').controller('ApplicantController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
        $scope.authentication = Authentication;
    	if($scope.authentication.user.admin){
            $http.post('/applicant', $scope.authentication).success(function(data, status, headers, config){
    		  $scope.ta = data;
    	//khj
    	   }).error(function(data, status, headers, config){
    		$scope.error = status;
    	   });
        }
        else{
            $location.path('/badPermission');
        }


  }]);
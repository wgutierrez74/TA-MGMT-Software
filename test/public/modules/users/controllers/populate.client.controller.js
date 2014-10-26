'use strict';

angular.module('users').controller('PopulateController', ['$scope', '$http', '$location', 'Authentication', 'myservice',
	function($scope, $http, $location, Authentication, myservice) {
        $scope.authentication = Authentication;
    	if($scope.authentication.user.admin){
            $scope.applicantsList = [];
    	    $scope.nameFilter = null;
            
            $http.get('/populate').success(function(data, status, headers, config){
                $scope.applicantList = data;
    	    }).error(function(data, status, headers, config){
    		      $scope.error = status;
    	    });
        }
        else{
            $location.path('/badPermission');
        }

        $scope.userInfo = function(taName){
            myservice.set(taName);
            $location.path('adminView/applicant');
        };

  }]);
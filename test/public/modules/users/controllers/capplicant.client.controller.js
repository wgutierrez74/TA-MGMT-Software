'use strict';

angular.module('users').controller('CApplicantController', ['$scope','$http', '$location', 'Authentication', 'myservice',
	function($scope, $http, $location, Authentication, myservice) {
        $scope.authentication = Authentication;
    	if($scope.authentication.user.faculty){
            var t = {
            'courseN': '' 
            };
            t.courseN = myservice.get();
            $http.post('/applicant', t).success(function(data, status, headers, config){
    		  $scope.ta = data;
    	//khj
    	   }).error(function(data, status, headers, config){
    		$scope.error = status;
    	   });
        }
        else{
            $location.path('/badPermission');
        }

        $scope.back = function(){
            $location.path('/faculty/course');
        };


  }]);
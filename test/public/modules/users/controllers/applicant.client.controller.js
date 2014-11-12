'use strict';

angular.module('users').controller('ApplicantController', ['$scope', '$http', '$location', 'Authentication', 'myservice',
	function($scope, $http, $location, Authentication, myservice) {
        $scope.authentication = Authentication;
    	if($scope.authentication.user.admin){
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
            $location.path('/advisorView/applicants');
        };

        $scope.verify = function(ta){
            var temp = {
            'uName': '' 
            };
            temp.uName = $scope.ta.username;
            $http.post('/verifyApplicant', ta).success(function(response){
                $scope.success = response;
            }).error(function(response){
                $scope.error = response;
            });
            $location.path('/advisorView/applicants');
        };


  }]);
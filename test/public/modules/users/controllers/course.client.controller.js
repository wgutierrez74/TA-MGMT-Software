'use strict';

angular.module('users').controller('CourseController', ['$scope', '$http', '$location', 'Authentication', 'Users', 'myservice',
	function($scope, $http, $location, Authentication, Users, myservice) {
        $scope.authentication = Authentication;
        
        if($scope.authentication.user.faculty){
            $scope.applicantsList = [];
    	    $scope.nameFilter = null;
            var t = {
            'courseN': '' 
            };
            t.courseN = myservice.get();
            $http.post('/courseTAList', t).success(function(data, status, headers, config){
                $scope.applicantList = data;
    	    }).error(function(data, status, headers, config){
                $scope.error = status;
    	    });
        }
        else{
            $location.path('/badPermission');
        }

        $scope.userInfo = function(name){
            myservice.set(name);
            $location.path('/faculty/course/applicant');
        };

  }]);
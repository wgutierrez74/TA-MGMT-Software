'use strict';

angular.module('users').controller('ACourseController', ['$scope', '$http', '$location', 'Authentication', 'myservice',
	function($scope, $http, $location, Authentication, myservice) {
        $scope.authentication = Authentication;
    	if($scope.authentication.user.admin){
            $scope.courseList = [];
    	    $scope.nameFilter = null;
            
            $http.get('/populateActiveCourses').success(function(data, status, headers, config){
                $scope.courseList = data;
    	    }).error(function(data, status, headers, config){
    		      $scope.error = status;
    	    });
        }
        else{
            $location.path('/badPermission');
        }

    
        $scope.courseInfo = function(){
            
            //$location.path('/advisorView');
        };
        $scope.back = function(){
            $location.path('/advisorView');
        };
        $scope.allCourses = function(){
            //$location.path('/advisorView');
        };
        $scope.addCourse = function(){
            $location.path('/advisorView/courses/add');
        };

  }]);
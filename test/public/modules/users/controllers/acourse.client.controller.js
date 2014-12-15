'use strict';

angular.module('users').controller('ACourseController', ['$scope', '$http', '$location', 'Authentication', 'myservice',
	function($scope, $http, $location, Authentication, myservice) {
        $scope.authentication = Authentication;
    	if($scope.authentication.user.admin){
            $scope.courseList = [];
    	    $scope.nameFilter = null;
            $scope.currentCourse = null;
            $scope.currentCourse=myservice.get();
            var courseinfo = {
            'active': 'Defualt' 
            };
            $scope.isactive = 'Default';
            if($scope.currentCourse.active===true)
                $scope.isactive = 'Active';//courseinfo.active = 'Active';
            else
                $scope.isactive = 'Inactive';//courseinfo.active ='Inactive';
            $http.get('/populateActiveCourses').success(function(data, status, headers, config){
                $scope.courseList = data;
    	    }).error(function(data, status, headers, config){
    		      $scope.error = status;
    	    });
        }
        else{
            $location.path('/badPermission');
        }

    
        $scope.courseInfo = function(course){
            myservice.set(course);
            //cN.courseName = name;
            $scope.currentCourse = myservice.get(course);
            $location.path('/advisorView/courses');
           //$scope.currentCourse = myservice.get(course);
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
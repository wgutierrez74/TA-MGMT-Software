'use strict';

angular.module('users').controller('AFacultyController', ['$scope', '$http', '$location', 'Authentication', 'myservice',
	function($scope, $http, $location, Authentication, myservice) {
        $scope.authentication = Authentication;
    	if($scope.authentication.user.admin){
            var t = {
            'facultyName': ''
            };
            $scope.coursesShown = 'Active Courses';
            $scope.courses = [];
            $scope.currentFaculty=myservice.get();
            t.facultyName = myservice.get();
            $http.post('/instructorCoursesActiveNA', t).success(function(data, status, headers, config){
    		  $scope.courses = data;
    	   }).error(function(data, status, headers, config){
    		$scope.error = status;
    	   });
        }
        else{
            $location.path('/badPermission'); 
        } 

        $scope.viewCourse = function(course) 
        {
            myservice.set(course);
            $location.path('/advisorView/courses');
        };

        $scope.allCourses = function(){
            $scope.coursesShown = 'All Courses';
            $http.post('/instructorCoursesNA', t).success(function(data, status, headers, config){
                $scope.courses = data;
            }).error(function(data, status, headers, config){
                  $scope.error = status;
            });
        };

        $scope.activeCourses = function(){
            $scope.coursesShown = 'Active Courses';
            $http.post('/instructorCoursesActiveNA', t).success(function(data, status, headers, config){
                $scope.courses = data;
            }).error(function(data, status, headers, config){
                  $scope.error = status;
            });
        };

        $scope.inactiveCourses = function() {
            $scope.coursesShown = 'Inactive Courses';
            $http.post('/instructorCoursesInactiveNA', t).success(function(data, status, headers, config){
                $scope.courses = data;
            }).error(function(data, status, headers, config){
                  $scope.error = status;
            });
        };

        $scope.back = function(){
            $location.path('/advisorView');
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
            $location.path('/advisorView');
        };


  }]);
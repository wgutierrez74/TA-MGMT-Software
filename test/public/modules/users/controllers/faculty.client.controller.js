'use strict';

angular.module('users').controller('FacultyController', ['$scope', '$http', '$location', 'Authentication', 'Users', 'myservice',
	function($scope, $http, $location, Authentication, Users, myservice) {
		 $scope.authentication = Authentication;

		// If user is not signed in then redirect back home
		//if (!$scope.user) $location.path('/');
		if($scope.authentication.user.faculty){
            myservice.set($scope.authentication.user);
            $scope.currentFaculty = myservice.get();
            $scope.coursesViewed = 'Active Courses';
            $scope.courseList = [];
    	    $scope.nameFilter = null;
            $http.post('/instructorCoursePopulate', $scope.user).success(function(data, status, headers, config){
                $scope.courseList = data;
    	    }).error(function(data, status, headers, config){
    		      $scope.error = status;
    	    });
        }
        else{
            $location.path('/badPermission');
        }

		$scope.courseApplicants = function(course) {
    		myservice.set(course);
            myservice.setInstructor(course.instructor);
    		$location.path('/faculty/course');
		};

        $scope.activeCourses = function() {
            $scope.coursesViewed = 'Active Courses';
            $http.post('/instructorCoursePopulate', $scope.user).success(function(data, status, headers, config){
                $scope.courseList = data;
            }).error(function(data, status, headers, config){
                  $scope.error = status;
            });
        };

        $scope.inactiveCourses = function() {
            $scope.coursesViewed = 'Inactive Courses';
            $http.post('/inactiveInstructorCourses', $scope.user).success(function(data, status, headers, config){
                $scope.courseList = data;
            }).error(function(data, status, headers, config){
                  $scope.error = status;
            });
        };

	}
]);

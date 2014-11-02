'use strict';

angular.module('users').controller('FacultyController', ['$scope', '$http', '$location', 'Authentication', 'Users', 'myservice',
	function($scope, $http, $location, Authentication, Users, myservice) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		if($scope.user.course1 === ''){
			$scope.course1 = '';
			$scope.course2 = '';
			$scope.course3 = '';
			$scope.course4 = '';
		}
		else{
			$scope.course1 = $scope.user.course1;
			if ($scope.user.course2 === '') {
				$scope.course2 = '';
				$scope.course3 = '';
				$scope.course4 = '';
			}
			else{
				$scope.course2 = $scope.user.course2;
				if ($scope.user.course3 === '') {
					$scope.course3 = '';
					$scope.course4 = '';
				}
				else{
					$scope.course3 = $scope.user.course3;
					if ($scope.user.course4 === '') {
						$scope.course4 = '';
					}
					else{
						$scope.course4 = $scope.user.course4;
					}
				}
			}
		}

		$scope.courseApplicants = function(course) {
    		myservice.set(course);
    		$location.path('/faculty/course');
		};

		$scope.addCourse = function() {
			$location.path('/faculty/addCourse');
		};

		$scope.removeCourse = function() {
			//$location.path('/settings/profile');
		};
		

		$scope.userInfo = function() {
			//$location.path('/settings/profile');
		};
	}
]);

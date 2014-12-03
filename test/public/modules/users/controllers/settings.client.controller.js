'use strict';

angular.module('users').controller('SettingsController', ['$window','$scope', '$http', '$location', 'Users', 'Authentication',
	function($window, $scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		$scope.temp = {
			'course' : '',
			'courseGrade' : ''
		};

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		//redirects user to the hashed path
		$scope.goNext = function(hash){
			$location.path(hash);
		};
		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid){
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);
	
				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
				$http.post('/uploadResume',$scope.user).success(function(data, status, headers, config){
                	$scope.success = 'Succefully uploaded resume';
    	    	}).error(function(data, status, headers, config){
    			      $scope.error = status;
    	    	});
				$window.location.href = '/#!/settings';
				$window.location.reload();
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.profile = function(){
			$window.location.href = '/#!/settings';
		};

		$scope.add = function(){
			// null or ''
			if($scope.temp.course === '' || $scope.temp.courseGrade === ''){
				$scope.courseError = 'Please enter both a course and a grade';
			}
			else{	
				//Check array if course already exsists in the coursestaken array already
				for(var i = 0; i<$scope.user.courses.length;i++){
					if($scope.user.courses[i] === $scope.temp.course){
						$scope.courseError = 'You have already registered course' + $scope.temp.course;
						return;
					}
				}
				//If so don't add. Else add locally
				$scope.user.courses.push($scope.temp.course);
				$scope.user.courseGrades.push($scope.temp.courseGrade);
				//Add to local copy of array-Update when user hits save application
				//Make sure temp is empty for next course added
				$scope.temp.course = '';
				$scope.temp.courseGrade = '';
				$scope.courseError = '';
			}
		};

		$scope.remove = function(removedCourse ,postion){
			$scope.yo = removedCourse;
			$scope.yop = postion;
			$scope.user.courses.splice(postion,1);
			$scope.user.courseGrades.splice(postion,1);
		};
	}
]);

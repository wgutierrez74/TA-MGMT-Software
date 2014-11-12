'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		//if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/settings');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
				if($scope.authentication.user.admin){
					$location.path('/advisorView');
				}
				else if($scope.authentication.user.faculty){
					$location.path('/faculty');
				}
				else if($scope.authentication.user.SUser){
					$location.path('/SUser');
				}
				else{
					$location.path('/settings');
				}
			
				
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.createFaculty = function() {
			$http.post('/createFaculty', $scope.faculty).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.faculty = response;

				// And redirect to the index page
				$location.path('/SUser');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.createAdmin = function() {
			$http.post('/createAdmin', $scope.admin).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.admin = response;

				// And redirect to the index page
				$location.path('/SUser');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.back = function(){
			$location.path('/SUser');
		};
	}
]);
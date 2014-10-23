'use strict';

angular.module('users').controller('SUserController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		$scope.createFaculty = function() {
			$location.path('/SUser/createFaculty');
		};

		$scope.createAdmin = function() {
			$location.path('/SUser/createAdmin');
		};

		

		

		
		
	}
]);

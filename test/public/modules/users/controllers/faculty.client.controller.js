'use strict';

angular.module('users').controller('FacultyController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		//$scope.editProfile = function() {
			//$location.path('/settings/profile');
		//};

		

		

		

		
		
	}
]);

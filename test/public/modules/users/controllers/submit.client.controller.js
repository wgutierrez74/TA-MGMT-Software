'use strict';

angular.module('users').controller('SubmitController', ['$window','$scope', '$http', '$location', 'Users', 'Authentication',
	function($window, $scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');


		$scope.editProfile = function() {
			$location.path('/settings/profile');
		};

		$scope.create = function() {
			$http.get('/create').success(function(data, status, headers, config){
                
    	    }).error(function(data, status, headers, config){
                
    	    });
		};

		

		

		

		
		
	}
]);

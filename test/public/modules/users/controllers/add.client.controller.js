'use strict';

angular.module('users').controller('AddController', ['$window','$scope', '$http', '$location', 'Users', 'Authentication',
	function($window, $scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// var t = {
  //   		'courseN': '' 
  //   	};


		$scope.updateProfile = function() {
			$http.post('/addCourse', $scope.ta).success(function(response){
 				Authentication.user = response;
 				$scope.user = Authentication.user;
    		
    	   	}).error(function(response){
    			$scope.error = response.message;
   	  		});	
			$window.location.href = '/#!/faculty';
		};

		$scope.facultyHome = function(){
			$location.path('/faculty');
		};		
		
	}
]);

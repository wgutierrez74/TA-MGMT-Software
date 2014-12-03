'use strict';

angular.module('users').controller('AddController', ['$window','$scope', '$http', '$location', 'Users', 'Authentication',
	function($window, $scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;


		$scope.addCourse = function() {
			$http.post('/addCourse', $scope.course).success(function(response){
    			$scope.success = 'Succesfully added course '+ $scope.course.courseN + ' to registrar';
    	   	}).error(function(response){
    			$scope.error = response.message;
   	  		});	
			//$window.location.href = '/#!/advisorView/courses';
		};

		//redirects user to the hashed path
		$scope.goNext = function(hash){
			$location.path(hash);
		};

		$scope.back = function(){
			$location.path('/advisorView');
		};		
		
	}
]);

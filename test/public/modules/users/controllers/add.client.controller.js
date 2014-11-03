'use strict';

angular.module('users').controller('AddController', ['$window','$scope', '$http', '$location', 'Users', 'Authentication',
	function($window, $scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// var t = {
  //   		'courseN': '' 
  //   	};


		$scope.updateProfile = function(ta) {
				$http.post('/addCourse', $scope.ta).success(function(response){
 					Authentication.user = response;
 					$scope.user = Authentication.user;
    			
    	   		}).error(function(response){
    				$scope.error = response.data.message;
    	  		});	
			$window.location.href = '/#!/faculty';
		};

		$scope.facultyHome = function(){
			$window.location.href = '/#!/faculty';
		};		
		
	}
]);

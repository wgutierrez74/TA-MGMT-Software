'use strict';

angular.module('users').controller('AddController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// var t = {
  //   		'courseN': '' 
  //   	};


		$scope.updateProfile = function(ta) {
				$scope.success = 'yeah';
				$scope.yeah = ta.cName;
				
				$http.post('/addCourse', $scope.ta).success(function(response){
 					$scope.success = 'Better Yeah';
 					Authentication.user = response;
 					$scope.user = Authentication.user;
    			
    	   		}).error(function(response){
    				$scope.error = response.data.message;
    				$scope.success = 'Fuck no';
    	  		});	
			
		};

		

		
		
	}
]);

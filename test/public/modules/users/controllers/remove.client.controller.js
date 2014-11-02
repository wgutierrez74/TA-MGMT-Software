'use strict';

angular.module('users').controller('RemoveController', ['$window','$scope', '$http', '$location', 'Authentication', 'Users', 'myservice',
	function($window, $scope, $http, $location, Authentication, Users, myservice) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		$scope.courseSelected = '';

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

		$scope.removeCourse = function() {
			$scope.showman = $scope.courseSelected;
			var t = {
            'courseN': '' 
            };
            t.courseN = $scope.courseSelected;
			$http.post('/removeCourse', t).success(function(response){
                $scope.user = response;
    	    }).error(function(data, status, headers, config){
    		      $scope.error = status;
    	    });
    	    $window.location.reload();
    	    
		};

		$scope.goBack = function(){
			$location.path('/faculty');
		};
		
	}
]);

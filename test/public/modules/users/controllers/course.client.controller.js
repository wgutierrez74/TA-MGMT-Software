'use strict';

angular.module('users').controller('CourseController', ['$scope', '$http', '$location', 'Authentication', 'Users', 'myservice', 'courseservice',
	function($scope, $http, $location, Authentication, Users, myservice, courseservice) {
        $scope.authentication = Authentication;
        
        if($scope.authentication.user.faculty){
            $scope.applicantsList = [];
    	    $scope.nameFilter = null;
            var t = {
            'courseN': '' 
            };
            t.courseN = myservice.get();
            courseservice.addProduct(t.courseN);
            $http.post('/courseTAList', t).success(function(data, status, headers, config){
                $scope.applicantList = data;
    	    }).error(function(data, status, headers, config){
                $scope.error = status;
    	    });
        }
        else{
            $location.path('/badPermission');
        }

        $scope.userInfo = function(name){
            myservice.set(name);
            $location.path('/faculty/course/applicant');
        };

        $scope.back = function(){
            $location.path('/faculty');
        };

  }]);
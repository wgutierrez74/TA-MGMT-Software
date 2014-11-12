'use strict';

angular.module('users').controller('CApplicantController', ['$scope','$http', '$location', 'Authentication', 'myservice', 'courseservice',
	function($scope, $http, $location, Authentication, myservice, courseservice) {
        $scope.authentication = Authentication;
    	$scope.t = {
            'courseN' : ''
        };
        if($scope.authentication.user.faculty){
            var w = {
            'courseN': '' 
            };
            $scope.t.courseN = myservice.get();
            $http.post('/applicant', $scope.t).success(function(data, status, headers, config){
    		  $scope.ta = data;
    	//khj
    	   }).error(function(data, status, headers, config){
    		$scope.error = status;
    	   });
        }
        else{
            $location.path('/badPermission');
        }

        $scope.back = function(){
            myservice.set(courseservice.getProducts());
            $location.path('/faculty/course');
        };

        $scope.recommend = function(){
            var w = {
            'courseN': '' ,
            'Name' : '',
            'TAUname' : ''
            };
            w.courseN = courseservice.getProducts();
            w.Name = $scope.ta.displayName;
            w.TAUName = $scope.ta.username;
            $http.post('/recommendTA', w).success(function(data, status, headers, config){
              $scope.success = 'TA ' + $scope.ta.displayname + ' is recommended for ' + courseservice.getProducts();
        //khj
           }).error(function(response){
                $scope.error = response;
           });

           
        };



  }]);
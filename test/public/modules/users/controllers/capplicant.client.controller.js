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
            $scope.courseName = courseservice.getProducts();
            $scope.recommended = false;
            $http.post('/applicant', $scope.t).success(function(data, status, headers, config){
    		  $scope.ta = data;
              //$scope.recommended = data.recommended;
              for(var i=0; i<data.recommended.length; i++)
            {
                if(data.recommended[i]===$scope.courseName)
                {
                    $scope.recommended = true;
                    $scope.recommendButton = 'Unrecommend ' +$scope.ta.displayName + ' for ' + $scope.courseName;
                }
            }
            if($scope.recommended===false)
                $scope.recommendButton = 'Recommend ' + $scope.ta.displayName + ' for ' + $scope.courseName;


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
                'TAUname' : '', 
                'research' : '',
                'gpa' : ''
            };
            w.courseN = courseservice.getProducts();
            w.Name = $scope.ta.displayName;
            w.TAUName = $scope.ta.username;
            w.research = $scope.ta.researchField;
            w.gpa = $scope.ta.gpa;
            if($scope.recommended===false)
            {
                $http.post('/recommendTA', w).success(function(data, status, headers, config){
                    $scope.success = 'TA ' + $scope.ta.displayname + ' is recommended for ' + courseservice.getProducts();
                }).error(function(response){
                    $scope.error = response;
                });
            }

           
        };



  }]);
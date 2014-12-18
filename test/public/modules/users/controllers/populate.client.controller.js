'use strict';

angular.module('users').controller('PopulateController', ['$scope', '$http', '$location', 'Authentication', 'myservice',
	function($scope, $http, $location, Authentication, myservice) {
        $scope.authentication = Authentication;
    	if($scope.authentication.user.admin){
            $scope.applicantsList = [];
    	    $scope.nameFilter = null;
            $scope.applicantsShown = 'Unverified Applicants';
            $scope.currentuser = myservice.get();
            $http.get('/populate').success(function(data, status, headers, config){
                $scope.applicantList = data;
    	    }).error(function(data, status, headers, config){
    		      $scope.error = status;
    	    });
        }
        else{
            $location.path('/badPermission');
        }

        $scope.verifiedApplicants = function()
        {
            $http.get('/populateVerified').success(function(data, status, headers, config){
                $scope.applicantList = data;
            }).error(function(data, status, headers, config){
                  $scope.error = status;
            });
            $scope.applicantsShown = 'Verified Applicants';
        };

        $scope.unverifiedApplicants = function()
        {
            $http.get('/populate').success(function(data, status, headers, config){
                $scope.applicantList = data;
            }).error(function(data, status, headers, config){
                  $scope.error = status;
            });
            $scope.applicantsShown = 'Unverified Applicants';
        };

        $scope.allApplicants = function()
        {
            $http.get('/populateAll').success(function(data, status, headers, config){
                $scope.applicantList = data;
            }).error(function(data, status, headers, config){
                  $scope.error = status;
            });
            $scope.applicantsShown = 'All Applicants';
        };

        $scope.userInfo = function(TA){
            myservice.set(TA);
            $scope.currentuser=TA;
            $location.path('/advisorView/applicants/ta');
        };

        $scope.back = function(){
            $location.path('/advisorView');
        };

  }]);
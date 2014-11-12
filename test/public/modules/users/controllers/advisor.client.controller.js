'use strict';

angular.module('users').controller('AdvisorController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
        $scope.authentication = Authentication;
    	if($scope.authentication.user.admin){
        
        }
        else{
            $location.path('/badPermission');
        }

        $scope.homeAdvisorView = function(){
            $location.path('/advisorView');
        };
        $scope.matchmaking = function(){
            //$location.path('adminView/applicant');
        };
        $scope.systemSettings = function(){
            //$location.path('adminView/applicant');
        };
        $scope.courses = function(){
            $location.path('advisorView/courses');
        };
        $scope.applicants = function(){
            $location.path('advisorView/applicants');
        };

  }]);
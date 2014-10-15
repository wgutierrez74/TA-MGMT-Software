'use strict';

angular.module('users').controller('PopulateController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
    	$scope.authentication = Authentication;
    	$scope.applicantsList = [];
    	$scope.tester = 'This shit actually works';
    	$http.get('/populate').success(function(data, status, headers, config){
    		$scope.applicantList = data;
    	//khj
    	}).error(function(data, status, headers, config){
    		$scope.error = status;
    	});

  }]);
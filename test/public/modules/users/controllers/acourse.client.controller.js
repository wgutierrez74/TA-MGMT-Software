'use strict';

angular.module('users').controller('ACourseController', ['$scope', '$http', '$location', 'Authentication', 'myservice',
	function($scope, $http, $location, Authentication, myservice) {
        $scope.authentication = Authentication;
    	if($scope.authentication.user.admin){
            $scope.courseList = [];
    	    $scope.nameFilter = null;
            $scope.currentCourse = null;
            $scope.currentCourse=myservice.get();
            if($scope.currentCourse.active===true)
            {
                $scope.isactive = 'Active';
                $scope.buttonstatus ='Deactivate Course';
            }
            else
            {
                $scope.isactive = 'Inactive';
                $scope.buttonstatus ='Activate Course';
            }
            $http.get('/populateAllCourses').success(function(data, status, headers, config){
                $scope.courseList = data;
    	    }).error(function(data, status, headers, config){
    		      $scope.error = status;
    	    });
        }
        else{
            $location.path('/badPermission');
        }
 
        $scope.updateCourseStatus = function(course)
        {
            if($scope.currentCourse.active===true)
            {
                $http.post('/deactivateCourse', course).success(function(response){                 
                }).error(function(response) {
                    $scope.error = response.message;
                });
                $scope.currentCourse.active=false;
            }
            else
            {
                $http.post('/activateCourse', course).success(function(response){
                    myservice.set(course);
                    $scope.currentCourse = myservice.get();
                    
                }).error(function(response) {
                    $scope.error = response.message;
                });
                $scope.currentCourse.active=true;
            }   
        };

        $scope.courseInfo = function(course){
            myservice.set(course);
            $scope.currentCourse = course;
            $location.path('/advisorView/courses');
        };

        //Does not properly reflect course status until updateCourseStatus is called
        //Needs to be fixed
        $scope.updatePage = function(course){
            myservice.set(course);
            $scope.currentCourse=myservice.get();//=course;
            if($scope.currentCourse.active===true)
            {
                $scope.buttonstatus = 'Deactivate Course';
                $scope.isactive = 'Active';
            }
            else
            {
                $scope.buttonstatus = 'Activate Course';
                $scope.isactive = 'Inactive';
            }
        };
        $scope.back = function(){
            $location.path('/advisorView');
        };
        $scope.allCourses = function(){
            //$location.path('/advisorView');
        };
        $scope.addCourse = function(){ 
            $location.path('/advisorView/courses/add');
        };
 
  }]); 
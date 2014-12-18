'use strict';

angular.module('users').controller('ACourseController', ['$scope', '$http', '$location', 'Authentication', 'myservice',
	function($scope, $http, $location, Authentication, myservice) {
        $scope.authentication = Authentication;
    	if($scope.authentication.user.admin){
            $scope.TAName ='Default';
            $scope.courseList = [];
            $scope.TAList=[];
    	    $scope.nameFilter = null;
            $scope.currentCourse = null;
            $scope.isactive = 'Default';
            $scope.activatebutton = 'Default';
            $scope.coursesshown = 'Active Courses';

            var cc = {
                'currentCourse': null,
                'courseN': ''
            };
            $scope.currentCourse=myservice.get();
            cc.currentCourse = $scope.currentCourse;
            cc.courseN = $scope.currentCourse.courseName;
            if($scope.currentCourse.active===true)
            {
                $scope.isactive = 'Active';
                $scope.activatebutton ='Deactivate Course';
            }
            else
            {
                $scope.isactive = 'Inactive';
                $scope.activatebutton ='Activate Course';
            }
            $http.get('/populateActiveCourses').success(function(data, status, headers, config){
                $scope.courseList = data;
    	    }).error(function(data, status, headers, config){
    		      $scope.error = status;
    	    });
            $http.post('/courseApplicants', $scope.currentCourse).success(function(data, status, headers, config){
                $scope.TAList = data;
                $scope.TAName = 'Success';//s$scope.TAList[0].displayName;
            }).error(function(data, status, headers, config){
                  $scope.error = status;
                  $scope.TAName = 'Failed';
            });
        }
        else{
            $location.path('/badPermission');
        }
 
        $scope.taView = function(TA)
        {
            myservice.set(TA);
            $location.path('/advisorView/applicants/ta');
        };

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
            if($scope.coursesshown==='Active Courses')    
            {
                $http.get('/populateActiveCourses').success(function(data, status, headers, config){
                    $scope.courseList = data;
                }).error(function(data, status, headers, config){
                      $scope.error = status;
                });
            }
            else if($scope.coursesshown==='All Courses')
            {
                $http.get('/populateAllCourses').success(function(data, status, headers, config){
                    $scope.courseList = data;
                }).error(function(data, status, headers, config){
                    $scope.error = status;
                });
            }
            else if($scope.coursesshown==='Inactive Courses')
            {
                $http.get('/populateInactiveCourses').success(function(data, status, headers, config){
                    $scope.courseList = data;
                }).error(function(data, status, headers, config){
                    $scope.error = status;
                });
            }
        };

        $scope.changeView = function()
        {
            $location.path('/advisorView/courses');
        };

        $scope.courseInfo = function(course){
            
            myservice.set(course);
            $scope.currentCourse = course;
            $scope.TAName = 'Clicked';

            
            
        };

        //Does not properly reflect course status until updateCourseStatus is called
        //Needs to be fixed
        $scope.updatePage = function(course){
            $scope.currentCourse=course;
            cc.currentCourse = myservice.get();
            if($scope.currentCourse.active===true)
            {
                $scope.activatebutton = 'Deactivate Course';
                $scope.isactive = 'Active';
            }
            else
            {
                $scope.activatebutton = 'Activate Course';
                $scope.isactive = 'Inactive';
            }
            $http.post('/courseApplicants', $scope.currentCourse).success(function(data, status, headers, config){
                $scope.TAList = data;
                $scope.TAName = 'Success';//s$scope.TAList[0].displayName;
            }).error(function(data, status, headers, config){
                  $scope.error = status;
                  $scope.TAName = 'Failed';
            });
            //$location.path('/advisorView/courses');
        };

        $scope.back = function(){
            $location.path('/advisorView');
        };

        $scope.allCourses = function(){
            $scope.coursesshown = 'All Courses';
            $http.get('/populateAllCourses').success(function(data, status, headers, config){
                $scope.courseList = data;
            }).error(function(data, status, headers, config){
                  $scope.error = status;
            });
        };

        $scope.activeCourses = function(){
            $scope.coursesshown = 'Active Courses';
            $http.get('/populateActiveCourses').success(function(data, status, headers, config){
                $scope.courseList = data;
            }).error(function(data, status, headers, config){
                  $scope.error = status;
            });
        };

        $scope.inactiveCourses = function() {
            $scope.coursesshown = 'Inactive Courses';
            $http.get('/populateInactiveCourses').success(function(data, status, headers, config){
                $scope.courseList = data;
            }).error(function(data, status, headers, config){
                  $scope.error = status;
            });
        };

        $scope.addCourse = function(){ 
            $location.path('/advisorView/courses/add');
        };
 
  }]); 
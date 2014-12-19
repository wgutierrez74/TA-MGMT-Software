'use strict';

angular.module('users').controller('AFacultyController', ['$scope', '$http', '$location', 'Authentication', 'myservice',
	function($scope, $http, $location, Authentication, myservice) {
        $scope.authentication = Authentication;
    	if($scope.authentication.user.admin){
            var t = {
            'facultyName': ''
            };
            $scope.message = 'test';
            $scope.courses = [];
            $scope.currentFaculty=myservice.get();
            t.facultyName = myservice.get();
            $http.post('/instructorCoursesNA', t).success(function(data, status, headers, config){
    		  $scope.courses = data;
              $scope.message='This worked';
    	   }).error(function(data, status, headers, config){
    		$scope.error = status;
    	   });
        }
        else{
            $location.path('/badPermission'); 
        } 

        $scope.viewCourse = function(TA, course) 
        {
            //this.get('controllers.acoursecontroller').courseInfo(courseName);
            //myservice.set(TA);
            //t.TAName = myservice.get;
            $http.get('/populateAllCourses').success(function(data, status, headers, config){
              $scope.courses=data;
              for(var i=0; i<data.length; i++)
                {
                    console.log(i);
                    if($scope.courses[i].courseName===course)
                    {
                        myservice.set($scope.courses[i]);
                        $location.path('/advisorView/courses');
                    }
                }
                //$location.path('/badPermission');
           }).error(function(data, status, headers, config){
            $location.path('/badPermission');
            $scope.error = status;
           });

            
        };

        $scope.back = function(){
            $location.path('/advisorView');
        };

        $scope.verify = function(ta){
            var temp = {
            'uName': '' 
            };
            temp.uName = $scope.ta.username;
            $http.post('/verifyApplicant', ta).success(function(response){
                $scope.success = response;
            }).error(function(response){
                $scope.error = response;
            });
            $location.path('/advisorView');
        };


  }]);
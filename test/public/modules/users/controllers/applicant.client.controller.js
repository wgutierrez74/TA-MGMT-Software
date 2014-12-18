'use strict';

angular.module('users').controller('ApplicantController', ['$scope', '$http', '$location', 'Authentication', 'myservice',
	function($scope, $http, $location, Authentication, myservice) {
        $scope.authentication = Authentication;
    	if($scope.authentication.user.admin){
            var t = {
            'courseN': '',
            'TAName': ''
            };
            $scope.courses = [];
            $scope.currentTA=myservice.get();
            t.courseN = myservice.get();
            $http.post('/applicant', t).success(function(data, status, headers, config){
    		  $scope.ta = data;
    	//khj
    	   }).error(function(data, status, headers, config){
    		$scope.error = status;
    	   });
        }
        else{
            $location.path('/badPermission'); 
        }

        $scope.viewCourse = function(TA)
        {
            //this.get('controllers.acoursecontroller').courseInfo(courseName);
            //myservice.set(TA);
            //t.TAName = myservice.get;
            $http.get('/populateAllCourses').success(function(data, status, headers, config){
              $scope.courses=data;
              for(var i=0; i<10; i++)
                {
                    console.log(i);
                    if($scope.courses[i].courseName===TA.course1)
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
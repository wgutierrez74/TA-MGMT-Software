'use strict';

angular.module('users').controller('ApplicantController', ['$scope', '$http', '$location', 'Authentication', 'myservice',
	function($scope, $http, $location, Authentication, myservice) {
        $scope.authentication = Authentication;
    	if($scope.authentication.user.admin){
            var t = {
            'courseN': ''
            };
            $scope.ta=null;
            $scope.courses = [];
            $scope.currentTA=myservice.get();
            $scope.taVerifyButton = 'Default';
            t.courseN = $scope.currentTA.username;
            $http.post('/applicant', t).success(function(data, status, headers, config){
    		  $scope.ta = data;
              if($scope.ta.verified===true)
                $scope.taVerifyButton = $scope.ta.displayName + ' is verified';
            else if($scope.ta.verified===false)
                $scope.taVerifyButton = 'Verify credentials for ' + $scope.ta.displayName;
    	//khj
    	   }).error(function(data, status, headers, config){
    		$scope.error = status;
    	   });
           /*if($scope.ta.verified===true)
                $scope.taVerifyButton = $scope.ta.displayName + ' is verified';
            else if($scope.ta.verified===false)
                $scope.taVerifyButton = 'Verify credentials for ' + $scope.ta.displayName;*/
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
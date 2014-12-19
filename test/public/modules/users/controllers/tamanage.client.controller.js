'use strict';

angular.module('users').controller('TAManageController', ['$scope', '$http', '$location', 'Authentication', 'Users', 'courseservice', 'myservice',
	function($scope, $http, $location, Authentication, Users, courseservice, myservice) {
        $scope.authentication = Authentication;
        
        if($scope.authentication.user.faculty){
            var t = { 
            'courseN': '' 
            };
            var courseChosen = null;
            t.courseN = courseservice.getProducts();
            $scope.currentCourse = t.courseN;
            courseservice.addProduct(t.courseN);
            $http.post('/courseTAS', t).success(function(data, status, headers, config){
                $scope.courseS = data;
                var courseChosen = data;
            }).error(function(data, status, headers, config){
               // $scope.error = status;
            });

            //$scope.test = courseChosen.recommendedUsers[0];
        }
        else{
            $location.path('/badPermission');
        }

        $scope.show = courseservice.getProducts();

        $scope.userInfo = function(name){
            //Show more info on same page about particular user 
        };

        $scope.viewProfile = function(TA) {
            myservice.set(TA);
            $location.path('/faculty/course/applicant');
        };

        $scope.removeTA = function(TAUName, pos){
            var w = {
                'TAUName': TAUName,
                'gpa' : courseChosen.recommendedGPA[pos],
                'research' : courseChosen.recommendedResearch[pos],
                'course' : '',
                'instructor' : ''
            };
            courseChosen.recommended.splice(pos, 1);
            courseChosen.recommendedUser.splice(pos, 1);
            //$scope.test = 'before';
            $http.post('/removeChosen', courseChosen).success(function(response){
                $scope.success = response;
                //$scope.test = 'FUCK MAN';
             }).error(function(response){
                //$scope.error = response;
             });
        };
        $scope.backHome = function(){
            $location.path('/faculty');
        };
        $scope.backCourse = function(){
            $location.path('/faculty/course');
        };

  }]);
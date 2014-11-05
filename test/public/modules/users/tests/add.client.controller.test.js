'use strict';

(function() {
	// Authentication controller Spec
	describe('AddController', function() {
		// Initialize global variables
		var AddController,
			scope,
			$httpBackend,
			$stateParams,
			$location;

		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Load the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Authentication controller
			AddController = $controller('AddController', {
				$scope: scope
			});
		}));

		

		it('$scope.updateProfile() should fail to update with blank text entered', function() {
			// Foo/Bar combo assumed to not exist
			//scope.ta.cName = undefined;
			// Test expected POST request
			$httpBackend.expectPOST('/addCourse', scope.ta).respond(400, {
				'message': 'Course left blank'
			});

			scope.updateProfile();
			$httpBackend.flush();
			// Test scope value
			expect(scope.error).toEqual('Course left blank');

		});
		
		it('$scope.updateProfile() should fail if text entered is not long enough', function() {
			
			scope.ta = '12345678';
			
			$httpBackend.expectPOST('/addCourse', scope.ta).respond(400, {
				'message': 'Test not long enough'
			});
			scope.updateProfile();
			$httpBackend.flush();
			// Test scope value
			expect(scope.error).toEqual('Test not long enough');

		});

		it('$scope.facultyHome() should go to correct url', function() {
			// Test expected POST request
			scope.facultyHome();

			// Test scope value
			expect($location.url()).toBe('/faculty');
		});
		// it('$scope.updateProfile() should fail if text\'s first 3 characters aren\' letters', function() {
			
		// 	var t = {
  //           'courseN': '' 
  //           };
  //           t.courseN = '1234567';
			
		// 	$httpBackend.expectPOST('/addCourse', t).respond(400, {
		// 		'message': 'Incorect Format - Doesn\'t begin with letters'
		// 	});
			
		// 	scope.updateProfile();
		// 	$httpBackend.flush();
		// 	console.log(scope.error);
		// 	// Test scope value
		// 	expect(scope.error).toEqual('Incorect Format - Doesn\'t begin with letters');

		// });

	});
}());
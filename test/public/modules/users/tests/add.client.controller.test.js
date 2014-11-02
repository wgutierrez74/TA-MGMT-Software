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

		

		it('$scope.updateProfile() should fail to update with wrong credentials', function() {
			// Foo/Bar combo assumed to not exist
			scope.authentication.user = 'Foo';
			scope.credentials = 'Bar';

			// Test expected POST request
			$httpBackend.expectPOST('/updateProfile').respond(400, {
				'message': 'Unknown user'
			});

			scope.updateProfile();
			$httpBackend.flush();

			// Test scope value
			expect(scope.error).toEqual('Unknown user');
		});
		

		
	});
}());
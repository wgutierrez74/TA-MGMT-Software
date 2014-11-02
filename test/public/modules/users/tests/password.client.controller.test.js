'use strict';

(function() {
	// Authentication controller Spec
	describe('PasswordController', function() {
		// Initialize global variables
		var PasswordController,
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

			// Initialize the Password controller
			PasswordController = $controller('PasswordController', {
				$scope: scope
			});
		}));

		it('$scope.resetUserPassword() should fail if user is not signed in', function() {
				// Test expected POST request
			$httpBackend.expectPOST('/auth/reset/undefined').respond(400, {
				'message': 'User is not signed in'
			});

			scope.resetUserPassword();
			$httpBackend.flush();

			// Test scope value
			expect(scope.error).toEqual('User is not signed in');
		});

		it('$scope.resetUserPassword() should fail if no new password entered', function() {
			// Test expected POST request
			$httpBackend.expectPOST('/auth/reset/undefined').respond(400, {
				'message': 'Please provide a new password'
			});

			scope.resetUserPassword();
			$httpBackend.flush();

			// Test scope value
			expect(scope.error).toEqual('Please provide a new password');
		});

		it('$scope.resetUserPassword() should fail if new passwords do not match', function() {
			// Test expected POST request
			$httpBackend.expectPOST('/auth/reset/undefined').respond(400, {
				'message': 'Passwords do not match'
			});

			scope.resetUserPassword();
			$httpBackend.flush();

			// Test scope value
			expect(scope.error).toEqual('Passwords do not match');
		});


	});
}());
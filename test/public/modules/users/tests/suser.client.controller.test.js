'use strict';

(function() {
	// Applicant controller Spec
	describe('SUserController', function() {
		// Initialize global variables
		var SUserController,
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

			// Initialize the Faculty controller
			SUserController = $controller('SUserController', {
				$scope: scope
			});
		}));

		it('$scope.createFaculty() should go to correct url', function() {
			// Test expected POST request
			scope.createFaculty();

			// Test scope value
			expect($location.url()).toBe('/SUser/createFaculty');
		});

		it('$scope.createAdmin() should go to correct url', function() {
			// Test expected POST request
			scope.createAdmin();

			// Test scope value
			expect($location.url()).toBe('/SUser/createAdmin');
		});

	});
}());
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('editProfile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('profile', {
			url: '/settings',
			templateUrl: 'modules/users/views/settings/profile.client.view.html'
		}).
		state('faculty', {
			url: '/faculty',
			templateUrl: 'modules/users/views/facultyView.client.view.html'
		}).
		state('facultyCourse', {
			url: '/faculty/course',
			templateUrl: 'modules/users/views/facultyCourseView.client.view.html'
		}).
		state('facultyCourseManage', {
			url: '/faculty/course/manage',
			templateUrl: 'modules/users/views/facultyTAManage.client.view.html'
		}).
		state('facultyCourseApplicant', {
			url: '/faculty/course/applicant',
			templateUrl: 'modules/users/views/facultyCourseApplicant.client.view.html'
		}).
		state('facultyCreate', {
			url: '/SUser/createFaculty',
			templateUrl: 'modules/users/views/settings/facultyCreate.client.view.html'
		}).
		state('SUser', {
			url: '/SUser',
			templateUrl: 'modules/users/views/SUser.client.view.html'
		}).
		state('adminCreate', {
			url: '/SUser/createAdmin',
			templateUrl: 'modules/users/views/settings/adminCreate.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invlaid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		}).
		state('advisorView', {
			url: '/advisorView' ,
			templateUrl: 'modules/users/views/advisorView.client.view.html'
		}).
		state('advisorView-applicant', {
			url: '/advisorView/applicants' ,
			templateUrl: 'modules/users/views/listApplicants.client.view.html'
		}).
		state('advisorView-courses', {
			url: '/advisorView/courses' ,
			templateUrl: 'modules/users/views/advisorCoursesView.client.view.html'
		}).
		state('advisorView-courses-add', {
			url: '/advisorView/courses/add' ,
			templateUrl: 'modules/users/views/courseAdd.client.view.html'
		}).
		state('advisorView-courses-info', {
			url: '/advisorView/courses/info' ,
			templateUrl: 'module/users/views/courseInfo.client.view.html'
		}).
		state('advisorView-ta', {
			url: '/advisorView/applicants/ta' ,
			templateUrl: 'modules/users/views/applicantView.client.view.html'
		}).
		state('advisorView-faculty', {
			url: '/advisorView/faculty',
			templateUrl: 'modules/users/views/advisorFacultyView.client.view.html'
		}).
		state('badPermission', {
			url: '/badPermission' ,
			templateUrl: 'modules/users/views/badPermission.client.view.html'
		});
	}
]);
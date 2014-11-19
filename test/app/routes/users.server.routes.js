'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');

module.exports = function(app) {
	// User Routes
	var users = require('../../app/controllers/users');

	// Setting up the users profile api
	app.route('/users/me').get(users.me);
	app.route('/users').put(users.update);

	// Setting up the users password api
	app.route('/users/password').post(users.changePassword);
	app.route('/auth/forgot').post(users.forgot);
	app.route('/auth/reset/:token').get(users.validateResetToken);
	app.route('/auth/reset/:token').post(users.reset);

	// Setting up the users authentication api
	app.route('/auth/signup').post(users.signup);
	app.route('/auth/signin').post(users.signin);
	app.route('/auth/signout').get(users.signout);

	app.route('/populate').get(users.populate);
	app.route('/populateActiveCourses').get(users.populateCourses);
	app.route('/createAdmin').post(users.createAdmin);
	app.route('/createFaculty').post(users.createFaculty);
	app.route('/applicant').post(users.applicantInfo);
	app.route('/courseTAList').post(users.coursePopulate);
	app.route('/addCourse').post(users.addCourse);
	//app.route('/capplicant').post(users.capplicantInfo);
	app.route('/verifyApplicant').post(users.verifyUser);
	app.route('/removeCourse').post(users.removeCourse);
	app.route('/instructorCoursePopulate').post(users.instructorCourses);
	app.route('/recommendTA').post(users.recommendTA);
	app.route('/uploadResume').post(users.uploadResume);
	app.route('/allApplicants').get(users.allApplicants);
	app.route('/courseTAS').post(users.courseTAS);
	app.route('/create').get(users.creation);

	

	// Finish by binding the user middleware
	app.param('userId', users.userByID);
};

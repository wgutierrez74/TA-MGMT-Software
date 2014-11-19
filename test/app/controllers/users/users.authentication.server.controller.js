'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

/**
 * Signup
 */
exports.signup = function(req, res) {
	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	// Init Variables
console.log(req.body);

	var user = new User(req.body);
	var message = null;


	// Add missing user fields
	user.provider = 'local';
	user.displayName = user.firstName + ' ' + user.lastName;
	user.student = true;
	//user.faculty = true;
	//user.admin = true;
	//user.SUser = true;

	//Check to see if user has filled the required fields
	if(user.username !== '' && user.password!== '' && user.firstName !== '' && user.lastName !== '')
	{

		// Add missing user fields
		user.provider = 'local';
		user.displayName = user.firstName + ' ' + user.lastName;
		user.student = true;
		//user.faculty = true;
		//user.admin = true;
		//user.superuser = true;

		// Then save the user
		user.save(function(err) {
			if (err) {
				console.log('save error');
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				// Remove sensitive data before login
				user.password = undefined;
				user.salt = undefined;

				req.login(user, function(err) {
					if (err) {
						console.log('login error');
						res.status(400).send(err);
					} else {
						res.jsonp(user);
					}
				});
			}
		});
	}
	//One or more fields was not filled
	else{
		return res.status(400).send({
			message: 'Must fill all fields'
		});
	}
};

/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if (err || !user) {
			res.status(400).send(info);
		} else {
			// Remove sensitive data before login
			user.password = undefined;
			user.salt = undefined;

			req.login(user, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.jsonp(user);
				}
			});
		}
	})(req, res, next);
};

/**
 * Signout
 */
exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};
'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

exports.createAdmin = function(req, res){
	delete req.body.roles;

	// Init Variables
	console.log(req.body);

	var user = new User(req.body);
	var message = null;

	// Add missing user fields
	user.admin = true;
	user.provider = 'local';
	user.displayName = user.firstName + ' ' + user.lastName;

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
			res.send('Created Admin User');
		}
	});
};

exports.createFaculty = function(req, res){
	delete req.body.roles;

	// Init Variables
	console.log(req.body);

	var user = new User(req.body);
	var message = null;

	// Add missing user fields
	user.faculty = true;
	user.provider = 'local';
	user.displayName = user.firstName + ' ' + user.lastName;

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
			res.send('Created Admin User');
		}
	});
};

exports.applicantInfo = function(req, res) {
	console.log('Brooooooo');
	
	console.log(req);
	console.log(req.body);
	console.log(req.body.taName);
	console.log(req.msg);
	var name = req.body.taName;
		
	var twisted = function(res){
        return function(err, data){
            if (err){
                console.log('error occured');
                return;
            }
            //console.log(data);
            res.jsonp(data);
           
         };
    };

	 User.findOne({username : name}).exec(twisted(res));
	
};
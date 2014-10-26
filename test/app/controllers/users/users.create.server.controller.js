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
	var name = req.body.courseN;
		
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

// exports.capplicantInfo = function(req, res) {
// 	console.log('Brooooooo');
	
// 	var name = req.body.courseN;
		
// 	var twisted = function(res){
//         return function(err, data){
//             if (err){
//                 console.log('error occured');
//                 return;
//             }
//             //console.log(data);
//             res.jsonp(data);
           
//          };
//     };

// 	 User.findOne({username : name}).exec(twisted(res));
	
// };

exports.coursePopulate = function(req, res) {
	console.log('Brooooooo');
	var name = req.body.courseN;
	var twisted = function(res){
        return function(err, data){
            if (err){
                console.log('error occured');
                return;
            }
            console.log(data);
            res.jsonp(data);
           
        };
    };

	User.find({course1: name}, 'displayName username', twisted(res));
	
};

exports.addCourse = function(req, res) {
	
	var course = req.body.cName;
	var user = req.user;
	console.log(req.user);
	console.log(user);
	if (user) {
		
		if(user.course1 === ''){
			user.course1 = course;
		}
		else{
			if(user.course2 === ''){
				user.course2 = course;
			}
			else{
				if(user.course3 === ''){
					user.course3 = course;
				}
				else{
					if(user.course4 === ''){
						user.course4 = course;
					}
					else{
						res.status(400).send({
							message: 'Cannot add course. Too many courses'
						});
						return;
					}
				}
			}
		}

		user.updated = Date.now();

		user.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.jsonp(user);
					}
				});
			}
		});
	} 
	else{
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
	
};

exports.populate = function(req, res) {
	console.log('Brooooooo');
	var twisted = function(res){
        return function(err, data){
            if (err){
                console.log('error occured');
                return;
            }
            console.log(data);
            res.jsonp(data);
           
        };
    };

	User.find({student: true}, 'displayName username gpa', twisted(res));
	
};

exports.verifyUser = function(req, res) {
	//console.log(req);
	//console.log(req.body);
	console.log('----------------------------------');

	//console.log(req.body.);
	delete req.body.salt;
	delete req.body.password;
	User = req.body;
	console.log(User);
	if (User) {
		User.verified = true;
		User.updated = Date.now();
		console.log(User);

		User.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				return res.status(200).send({
					message: 'Verified'
				});
			}
		});
	} 
	else{
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
	
};
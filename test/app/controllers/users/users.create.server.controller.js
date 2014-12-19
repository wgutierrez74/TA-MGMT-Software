'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
	Course = mongoose.model('Course');

exports.createAdmin = function(req, res){
	delete req.body.roles;

	// Init Variables
	console.log(req.body);

	var user = new User(req.body);

	user.verified = true;
	user.submitted = true;
	var message = null;

	// Add missing user fields
	user.verified = true;
	user.submitted = true;
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
	user.verified = true;
	user.submitted = true;
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
	var name = req.body.courseN;
	console.log(name);
		
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

exports.facultyInfo = function(req, res) {
	var name = req.body.facultyName;
	console.log(name);
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

	User.findOne({displayName : name, faculty : true}).exec(twisted(res));
};

exports.populateSpecificCourse = function(req, res) {
	var user = req.body;
	var cn = user.course1;
	console.log(req.body.TAName);
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

	//Course.findOne({courseName : cn});
	Course.findOne({courseName : cn}).exec(twisted(res));
	
};


exports.courseApplicants = function(req, res) {
	var name = req.body.courseName;
	console.log(name);
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

	User.find({student: true, $or:[ { course1: name }, { course2: name }, {course3: name}, {course4: name} ]}, 'displayName username', twisted(res));
};

exports.coursePopulate = function(req, res) {
	var name = req.body.courseN;
	console.log(name);
	console.log(req.body);
	console.log(req);
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

	User.find({student: true, $or:[ { course1: name }, { course2: name }, {course3: name}, {course4: name} ]}, 'displayName username', twisted(res));
	//User.find({ student: true }).where('course1').equals(name).where('course2').equals(name).where('course3').equals(name).where('course4').equals(name).select('displayName username').exec(twisted(res));
};


exports.addCourse = function(req, res) {
	var course = req.body.courseName;
	if(course === undefined){
		console.log('Course is blank');
		res.status(400).send({
			message: 'Course left blank'
		});
		console.log('returned properly');
		return;
	}

	var instructor = req.body.instructor;
	if(instructor === undefined){
		console.log('Instructor is blank');
		res.status(400).send({
			message: 'Instructor left blank'
		});
		console.log('returned properly');
		return;
	}

	console.log(course.length);
	var i = 0;
	if(course.length < 7){
			console.log('Incorect Format');
			res.status(400).send({
				message: 'Text not long enough'
			});
			return;
	}
	while(i<7){
		if(i<3){
			var x = course.charCodeAt(i);
			if((x>64&&x<91)||(x>96&&x<123)||(x>127&&x<155)||(x>159&&x<166)){
				console.log('It\'s a letter');
			}
			else{
				console.log('Incorect Format');
				res.status(400).send({
					message: 'Incorect Format - Doesn\'t begin with letters'
				});
				return;
			}
		}
		else{
			var r = course.charCodeAt(i);
			if(r>57 || r<48){
				console.log('Not a number or Incorect Format');
				res.status(400).send({
					message: 'Incorect Format'
				});
				return;
			}
		}
		i = i + 1;
	}	
	var courseNew = new Course(req.body);
	courseNew.provider = 'local';
	courseNew.updated = Date.now();
	courseNew.active = true;
	courseNew.instructor = instructor;
	console.log(courseNew.instructor);
	courseNew.save(function(err) {
		if (err) {
			console.log('save error');
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}

	});
};

exports.populate = function(req, res) {
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

	User.find({verified: false, student: true, faculty: false, admin: false}, 'displayName username gpa', twisted(res));
	
};

exports.populateAll = function(req, res) {
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

	User.find({student: true, faculty: false, admin: false}, 'displayName username gpa', twisted(res));
	
};

exports.populateVerified = function(req, res) {
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

	User.find({verified: true, student: true}, 'displayName username gpa', twisted(res));
	
};


exports.populateCourses = function(req, res) {
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

	Course.find({active: true}, 'courseName instructor active', twisted(res));
	
};

exports.populateAllCourses = function(req, res) {
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

	Course.find( 'courseName instructor active', twisted(res));	
};

exports.populateInactiveCourses = function(req, res) {
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

	Course.find({active: false}, 'courseName instructor active', twisted(res));	
};

exports.deactivateCourse = function(req, res) {
	Course.findOne({courseName: req.body.courseName}, function(err, course) {
		console.log(course.active);
		course.active = false;
		console.log(course.active);
		course.save();
	});
};

exports.activateCourse = function(req, res) {
	Course.findOne({courseName: req.body.courseName}, function(err, course) {
		console.log(course.active);
		course.active = true;
		console.log(course.active);
		course.save();
	});
};
exports.instructorCourses = function(req, res) {
	console.log(req.user);
	console.log(req.body);
	var instructor = req.user.displayName;
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

	Course.find({active: true, instructor: instructor}, 'courseName instructor', twisted(res));
	
};

//finds courses for instructor even without a User for that instructor
exports.instructorCoursesNA = function(req, res) {
	var instructorName = req.body.facultyName;
	console.log(instructorName);
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

	Course.find({instructor: instructorName}, 'courseName instructor', twisted(res));
};

exports.instructorCoursesInactiveNA = function(req, res) {
	var instructorName = req.body.facultyName;
	console.log(instructorName);
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

	Course.find({instructor: instructorName, active: false}, 'courseName instructor', twisted(res));
};

exports.instructorCoursesActiveNA = function(req, res) {
	var instructorName = req.body.facultyName;
	console.log(instructorName);
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

	Course.find({instructor: instructorName, active: true}, 'courseName instructor', twisted(res));
};

exports.inactiveInstructorCourses = function(req, res) {
	console.log(req.user);
	console.log(req.body);
	var instructor = req.user.displayName;
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

	Course.find({active: false, instructor: instructor}, 'courseName', twisted(res));
	
};

exports.verifyUser = function(req, res) {
	
	delete req.body.salt;
	delete req.body.password;
	req.user._id = req.body._id;
	req.user.displayName = req.body.displayName;
	req.user.provider = req.body.provider;
	req.user.username = req.body.username;
	//req.user. = req.body._id;
	req.user.updated = req.body.updated;
	//req.user._id = req.body._id;
	req.user.submitted = req.body.submitted;
	req.user.verified = req.body.verified;
	//req.user._id = req.body._id;
	req.user.admin = req.body.admin;
	req.user.student = req.body.student;
	req.user.created = req.body.created;
	//req.user._id = req.body._id;
	req.user.course4 = req.body.course4;
	req.user.course3 = req.body.course3;
	req.user.course2 = req.body.course2;
	req.user.course1 = req.body.course1;
	req.user.researchField = req.body.researchField;
	req.user.advisor = req.body.advisor;
	req.user.abilities = req.body.abilities;
	req.user.gpa = req.body.gpa;
	req.user.email = req.body.email;
	req.user.lastName = req.body.lastName;
	req.user.firstName = req.body.firstName;
	var user = req.user;
	//User.roles = [ 'user' ];
	//console.log(User);
	if (user) {
		user.verified = true;
		user.updated = Date.now();
		console.log(user);

		user.save(function(err) {
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

exports.removeCourse = function(req, res) {
	var removedCourse = req.body.courseN;
	console.log(req.user);
	var user = req.user;

	if(user.course4 === removedCourse){
		user.course4 = '';
		user.updated = Date.now();
		user.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} 
			else {
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
	else if(user.course3 === removedCourse){
		if(user.course4 === ''){
			user.course3 = '';
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
			user.course3 = user.course4;
			user.course4 = '';
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
	}
	else if(user.course2 === removedCourse){
		if(user.course3 === ''){
			user.course2 = '';
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
			if(user.course4 === ''){
				user.course2 = user.course3;
				user.course3 = '';
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
				user.course2 = user.course3;
				user.course3 = user.course4;
				user.course4 = '';
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
		}
	}
	else if(user.course1 === removedCourse){
		if(user.course2 === ''){
			user.course1 = '';
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
			if(user.course3 === ''){
				user.course1 = user.course2;
				user.course2 = '';
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
				if(user.course4 === ''){
					user.course1 = user.course2;
					user.course2 = user.course3;
					user.course3 = '';
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
					user.course1 = user.course2;
					user.course2 = user.course3;
					user.course3 = user.course4;
					user.course4 = '';
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
			}
		}
	}
	else{
		console.log('Not a correct setting');
	}

	
};

exports.recommendTA = function(req, res) {
	console.log(req.body);
	var cName = req.body.courseN;
	var TAName = req.body.Name;
	var TAUName = req.body.TAUName;
	var research = req.body.research;
	var gpa = req.body.gpa;
	console.log(req.body.gpa);
	var iName = req.user.displayName;
	console.log(TAName + ' ' + TAUName);
	Course.findOne({courseName: cName, instructor: iName}, function(err, course){
		if(err){console.log('Error finding file');}
  		else{
  			var length = course.recommended.length;
  			var i = 0;
  			var x = false;
  			while (i<length){
  				if(TAName === course.recommended[i]){
  					console.log('Shouldnt add user');
  					x = true;
  					break;
  				}
  				i = i + 1;
  			}
  			if(!x){
  				Course.findOneAndUpdate({courseName: cName, instructor: iName},{$push: {recommended: TAName}},{safe: true, upsert: true},
    				function(err, model) {
        			console.log(err);
    			});
    			Course.findOneAndUpdate({courseName: cName, instructor: iName},{$push: {recommendedUsers: TAUName}},{safe: true, upsert: true},
    				function(err, model) {
        			console.log(err);
    			});
    			Course.findOneAndUpdate({courseName: cName, instructor: iName},{$push: {recommendedGPA: gpa}},{safe: true, upsert: true},
    				function(err, model) {
        			console.log(err);
    			});
    			Course.findOneAndUpdate({courseName: cName, instructor: iName},{$push: {recommendedResearch: research}},{safe: true, upsert: true},
    				function(err, model) {
        			console.log(err);
    			});
  			}
  		}
	});

	User.findOne({username: TAUName}, function(err, user){
		if(err){console.log('Error finding file');}
  		else{
  			var length = user.recommended.length;
  			var i = 0;
  			var x = false;
  			while (i<length){
  				if(cName === user.recommended[i]){
  					console.log('Shouldnt add course');
  					x = true;
  					break;
  				}
  				i = i + 1;
  			}
  			if(!x){
  				User.findOneAndUpdate({username: TAUName},{$push: {recommended: cName}},{safe: true, upsert: true},
    				function(err, model) {
        			console.log(err);
    			});
    			
  			}
  		}
	});
};

exports.unrecommendTA = function(req, res) {
	var cName = req.body.courseN;
	var TAName = req.body.Name;
	var TAUName = req.body.TAUName;
	var iName = req.user.displayName;
	console.log(TAName + ' ' + TAUName);
	Course.findOneAndUpdate({courseName: cName, instructor: iName},{$pull: {recommended: TAName}},{safe: true, upsert: true},
    function(err, model) {
        console.log(err);
    });
};

exports.uploadResume = function(req, res) {
	console.log(req);
};

exports.allApplicants = function(req, res) {
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

	User.find({student : true, faculty: false, admin: false}).exec(twisted(res));
	
};

exports.courseTAS = function(req, res) {
	var name = req.body.courseN;
	console.log(name);
	//console.log(req);
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

	Course.findOne({courseName: name}, twisted(res));
};

exports.creation = function(req, res) {
	var i = 1;
	
    while(i<100){
    	var string = 'user' + i;
    	console.log(string);
    	var model;
    	if(i<51){
    		model = {
             	'firstName': string,
             	'lastName': 'student',
             	'displayName': string + ' student',
             	'username': string,
             	'password' : 'password',
             	'researchField' : 'Everything',
             	'gpa': '3.5',
             	'provider': 'local',
             	'course1': 'CEN3031',
             	'course2': 'CDA3101',
             	'student': true	
            };
        }
        else{
        	model = {
             	'firstName': string,
             	'lastName': 'student',
             	'displayName': string + ' student',
             	'username': string,
             	'password' : 'password',
             	'researchField' : 'Everything',
             	'gpa': '3.5',
             	'provider': 'local',
             	'course1': 'COP3503',
             	'course2': 'CAP4621',
             	'student': true
            };
        }
        var user = new User(model);
        user.updated = Date.now();
        user.save(function(err) {
			if (err) {
				console.log('error saving');
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			}
    	});
    	i = i + 1;
    }

    var modal;
    	modal = {
            'firstName': 'Alin',
            'lastName': 'Dobra',
            'displayName': 'Alin Dobra',
            'username': 'Faculty1',
            'password' : 'password',
            'provider': 'local',
            'faculty': true,
            'admin' : false	
        };
        
    var user1 = new User(modal);
    user1.updated = Date.now();
    user1.save(function(err) {
		if (err) {
			console.log('error saving');
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
    });
   
  	modal.firstName = 'Rong';
  	modal.lastName = 'Zhang';
  	modal.username = 'Faculty2';
  	modal.displayName = 'Rong Zhang';

  	var user3 = new User(modal);
    user3.updated = Date.now();
    user3.save(function(err) {
		if (err) {
			console.log('error saving');
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
    }); 

    modal.firstName = '';
  	modal.lastName = '';
  	modal.username = 'Advisor1';
  	modal.displayName = '';
  	modal.faculty = false;
  	modal.admin = true;
  	

  	var user2 = new User(modal);
    user2.updated = Date.now();
    user2.save(function(err) {
		if (err) {
			console.log('error saving');
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		}
    });   
};

exports.removeChosen = function(req, res){
		console.log(req.body);
		console.log(req.body.recommended[0]);	
		return res.status(400).send({
				message: 'Test'
		});

	// var TAUName = req.body.TAUName;
	// var pos = req.body.pos;
	// var course = req.body.course;
	// var instructorName = req.body.instructor;
	// Course.findOneAndUpdate({courseName: cName, instructor: iName},{$pull: {recommended: TAName}},{safe: true, upsert: true},
 //    function(err, model) {
 //        console.log(err);
 //    });
 //    Course.findOneAndUpdate({courseName: cName, instructor: iName},{$pull: {recommended: TAName}},{safe: true, upsert: true},
 //    function(err, model) {
 //        console.log(err);
 //    });	
	



};
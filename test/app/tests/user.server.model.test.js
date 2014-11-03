'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

/**
 * Globals
 */
var user, user2, admin;

/**
 * Unit tests
 */
describe('User Model Unit Tests:', function() {
	before(function(done) {
		user = new User({
			//firstName: 'Full',
			//lastName: 'Name',
			//displayName: 'Full Name',
			//email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local'
		});
		user2 = new User({
			//firstName: 'Full',
			//lastName: 'Name',
			//displayName: 'Full Name',
			//email: 'test@test.com',
			username: 'username',
			password: 'password',
			provider: 'local'
		});
		admin = new User({
			username: 'adminname',
			password: 'password',
			provider: 'local',
			admin: true
		});
		done();
	});

	describe('Method Save', function() {
		it('should begin with no users', function(done) {
			User.find({}, function(err, users) {
				users.should.have.length(0);
				done();
			});
		});

		it('should be able to save without problems', function(done) {
			user.save(done);
		});

		it('should fail to save an existing user again', function(done) {
			user.save();
			return user2.save(function(err) {
				should.exist(err);
				done();
			});
		});

		
	});

	describe('Method Save Admin', function() {
		/*it('should begin with no admins', function(done) {
			User.find({}, function(err, users) {
				users.should.have.length(0);
				done();
			});
		});*/

		it('should save admin without problems', function(done) {
			/*User.find({ admin: true}, function(err, users) {
				users.should.have.length(0);
				done();
			});*/
			admin.save(done);
		});

		it('should have admin field set true', function(done) {
			User.find({ admin: true}, function(err, users) {
				users.should.have.length(1);
				done();
			});
		});
	});

	after(function(done) {
		User.remove().exec();
		done();
	});

	
});

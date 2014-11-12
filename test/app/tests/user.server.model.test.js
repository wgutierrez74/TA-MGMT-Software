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
var user, user2, admin, faculty;

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
		faculty = new User({
			username: 'facultyname',
			password: 'password',
			provider: 'local',
			faculty:true
		});
		done();
	});

	describe('Method Save User', function() {
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


		it('should have no courses added', function(done) {
			//user.signin();
			User.find({course1: '', course2: '', course3: '', course4: ''}, function(err, users) {
				users.should.have.length(1);
				done();
			});
		});
		
	});

	describe('Method Save Admin', function() {
		it('should begin with no admins', function(done) {
			User.find({admin: true}, function(err, users) {
				users.should.have.length(0);
				done();
			});
		});
		it('should save admin without problems', function(done) {
			
			admin.save(done);
		});

		it('should have admin field set true', function(done) {
			User.find({ admin: true}, function(err, users) {
				users.should.have.length(1);
				done();
			});
		});
	});

	describe('Method Verify', function(){
		it('should return 0 if no users have been verified', function(done){
			User.find({verified: true}, function(err, users){
				users.should.have.length(0);
				done();
			});
			
		});

		it('should be able to verify a user that is unverified', function(done){
			user.verified = false;
			done();
		});

		it('should allow user verification to update', function(done){
			user.verified = true;
			user.save();
			done();
		});

		it('should return 1 verified user', function(done){
			User.find({verified: true},function(err, users) {
				users.should.have.length(1);
				done();
			});
		});
	
	});

	describe('Method Save Faculty', function() {
		it('should begin with no faculty', function(done) {
			User.find({faculty: true}, function(err, users) {
				users.should.have.length(0);
				done();
			});
		});

		it('should save faculty without problems', function(done) {
		
			faculty.save(done);
		});

		it('should have faculty field set true', function(done) {
			User.find({ faculty: true}, function(err, users) {
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

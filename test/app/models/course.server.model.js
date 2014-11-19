'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	crypto = require('crypto');

/**
 * A Validation function for local strategy properties
 */


/**
 * Course Schema
 */
var CourseSchema = new Schema({
	courseName: {
		type: String,
		trim: true,
		default: '',
		index: true
	},
	instructor: {
		type: String,
		trim: true,
		default: '',
		index: true
	},
	recommended: {
		type: [String],
		default: []
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'Provider is required'
	},
	providerData: {},
	additionalProvidersData: {},
	roles: {
		type: [{
			type: String,
			enum: ['user', 'admin']
		}],
		default: ['user']
	},
	updated: {
		type: Date
	},
	created: {
		type: Date,
		default: Date.now
	},
  	active: {
  		type: Boolean,
  		default: false
  	}
});

/**
 * Hook a pre save method to hash the password
 */
CourseSchema.pre('save', function(next) {
	this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
	next();
});

CourseSchema.index({ courseName: 1, faculty: 1 }, { unique: true });

mongoose.model('Course', CourseSchema);
'use strict';

angular.module('users').factory('myservice', [

	function(){

		var savedData = {};
		var instructorData = {};
 		
 		function set(data) {
   			savedData = data;
		}
 		function get() {
  			return savedData;
 		}
 		function setInstructor(data) {
   			instructorData = data;
		}
 		function getInstructor() {
  			return instructorData;
 		}

 		return {
 			set: set,
 	 		get: get,
 	 		setInstructor: setInstructor,
 	 		getInstructor: getInstructor
 	 		
 		};
	}

]);
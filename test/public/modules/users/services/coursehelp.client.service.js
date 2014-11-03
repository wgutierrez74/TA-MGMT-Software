'use strict';

angular.module('users').factory('coursehelp', [

	function(){

		var Data = {};
 		
 		function set2(data) {
   			Data = data;
		}
 		function get2() {
  			return Data;
 		}

 		return {
 			set2: set2,
 	 		get2: get2
 	 		
 		};
	}

]);
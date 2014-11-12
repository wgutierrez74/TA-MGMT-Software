'use strict';

angular.module('users').factory('courseservice', function() {
  var courseList = {};

  var addProduct = function(newObj) {
      courseList = newObj;
  };

  var getProducts = function(){
      return courseList;
  };

  return {
    addProduct: addProduct,
    getProducts: getProducts
  };

});
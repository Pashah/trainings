'use strict';

/**
 * @ngdoc function
 * @name cfFrontApp.controller:CategoryCtrl
 * @description
 * # CategoryCtrl
 * Controller of the cfFrontApp
 */
angular.module('cfFrontApp')
  .controller('CategoryCtrl', function ($scope, $http) {
    $scope.submit = function() {
      var category = $scope.category;
      category.created_by = 1;
      console.log(category);
      $http.post("http://localhost:8080/categories", category).success(function(category, status) {
        console.log("Added category with name: " + category.name);
        console.log("and with description: " + category.description);
        console.log("Got status: " + status);
      });
    };
  });

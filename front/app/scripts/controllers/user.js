'use strict';

/**
 * @ngdoc function
 * @name cfFrontApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the cfFrontApp
 */
angular.module('cfFrontApp')
  .controller('UserCtrl', function ($scope, $http) {
    $scope.submit = function() {
      console.log("Inside submit");
      var user = $scope.user;
      $http.post("http://localhost:8080/users", user).success(function(user, status) {
        console.log("Added user with name: " + user.name);
        console.log("User added succesfully");
        console.log("Got status: " + status);
      });
    };
  });

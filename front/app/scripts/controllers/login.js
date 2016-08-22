'use strict';

/**
 * @ngdoc function
 * @name cfFrontApp.controller:UserCtrl
 * @description
 * # UserCtrl
 * Controller of the cfFrontApp
 */
angular.module('cfFrontApp')
  .controller('LoginCtrl', function ($scope, $http) {
    $scope.submit = function() {
      var user = $scope.user;
      $http.post("http://localhost:8080/login", user).success(function(user, status) {
        console.log("Logged user in with name: " + user.name);
      });
    };
  });

'use strict';

/**
 * @ngdoc function
 * @name cfFrontApp.controller:TrainingCtrl
 * @description
 * # TrainingCtrl
 * Controller of the cfFrontApp
 */
angular.module('cfFrontApp')
  .controller('TrainingCtrlGrid', function($scope, $http) {
    var categories = $http.get("http://localhost:8080/trainings").success(function(data, status) {
      $scope.trainings = data;
    });
  })
  .controller('TrainingCtrl', function ($scope, $http) {
    var categories = $http.get("http://localhost:8080/categories").success(function(data, status) {
      $scope.categories = data;
    });
    var moves = $http.get("http://localhost:8080/moves").success(function(data, status) {
      $scope.moves = data;
    });
    $scope.submit = function() {
      var training = $scope.training;
      training.created_by = 1;
      console.log("Created by user id: " + training.created_by);
      $http.post("http://localhost:8080/trainings", training).success(function(training, status) {
        console.log("Added training with name: " + training.name);
        console.log("Got status: " + status);
      });
    };
  });

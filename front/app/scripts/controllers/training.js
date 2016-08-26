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
    $http.get('http://localhost:8080/trainings').success(function(data) {
      $scope.trainings = data;
    });
    $scope.addShortcut = function(id) {
      console.log(id);
      $http.post('http://localhost:8080/shorturls', {trainingId: id}).success(function(trainingId) {
          console.log('Generated new shortUrl: ' + trainingId);
      });
    };
  })
  .controller('TrainingCtrl', function ($scope, $http) {
    $http.get('http://localhost:8080/categories').success(function(data) {
      $scope.categories = data;
    });
    $http.get('http://localhost:8080/moves').success(function(data) {
      $scope.moves = data;
    });
    $scope.submit = function() {
      var training = $scope.training;
      training.createdBy = 1;
      console.log('Created by user id: ' + training.createdBy);
      $http.post('http://localhost:8080/trainings', training).success(function(training) {
        console.log('Added training with name: ' + training.name);
      });
    };
  });

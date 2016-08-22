'use strict';

/**
 * @ngdoc function
 * @name cfFrontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cfFrontApp
 */
angular.module('cfFrontApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  })
  .controller('NavCtrl', function($scope, $location) {
    $scope.isActive = function (viewLocation) {
      return viewLocation === $location.path();
    };
  });

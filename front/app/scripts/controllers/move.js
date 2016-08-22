'use strict';

/**
 * @ngdoc function
 * @name cfFrontApp.controller:MoveCtrl
 * @description
 * # MoveCtrl
 * Controller of the cfFrontApp
 */
 angular.module('cfFrontApp')
   .controller('MoveCtrlGrid', function($scope, $http) {
     $http.get('http://localhost:8080/moves').success(function(data) {
       $scope.moves = data;
     });
   })
   .controller('MoveCtrl', function ($scope, $http) {
     $scope.submit = function() {
       var move = $scope.move;
       move.created_by = 1;
       console.log(move);
       $http.post('http://localhost:8080/moves', move).success(function(move, status) {
         console.log('Added move with name: ' + move.name);
         console.log('and with description: ' + move.description);
         console.log('Got status: ' + status);
       });
     };
   });

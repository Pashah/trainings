'use strict';

describe('Controller: MoveCtrl', function () {

  // load the controller's module
  beforeEach(module('cfFrontApp'));

  var MoveCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MoveCtrl = $controller('MoveCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MoveCtrl.awesomeThings.length).toBe(3);
  });
});

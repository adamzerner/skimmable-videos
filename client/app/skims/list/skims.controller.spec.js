'use strict';

describe('Controller: SkimsCtrl', function () {

  // load the controller's module
  beforeEach(module('skimmableVideosApp'));

  var SkimsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SkimsCtrl = $controller('SkimsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});

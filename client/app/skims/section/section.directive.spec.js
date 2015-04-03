'use strict';

describe('Directive: section', function () {

  // load the directive's module and view
  beforeEach(module('skimmableVideosApp'));
  beforeEach(module('app/skims/section/section.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<section></section>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the section directive');
  }));
});
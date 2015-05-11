'use strict';

describe('Service: Preview', function () {

  // load the service's module
  beforeEach(module('skimmableVideosApp'));

  // instantiate service
  var Preview;
  beforeEach(inject(function (_Preview_) {
    Preview = _Preview_;
  }));

  it('should do something', function () {
    expect(!!Preview).toBe(true);
  });

});

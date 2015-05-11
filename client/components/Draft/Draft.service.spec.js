'use strict';

describe('Service: Draft', function () {

  // load the service's module
  beforeEach(module('skimmableVideosApp'));

  // instantiate service
  var Draft;
  beforeEach(inject(function (_Draft_) {
    Draft = _Draft_;
  }));

  it('should do something', function () {
    expect(!!Draft).toBe(true);
  });

});

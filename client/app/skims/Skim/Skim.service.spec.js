'use strict';

describe('Service: Skim', function () {

  // load the service's module
  beforeEach(module('skimmableVideosApp'));

  // instantiate service
  var Skim;
  beforeEach(inject(function (_Skim_) {
    Skim = _Skim_;
  }));

  it('should do something', function () {
    expect(!!Skim).toBe(true);
  });

});

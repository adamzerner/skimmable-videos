(function() {



'use strict';

angular.module('skimmableVideosApp')
  .controller('SkimsCtrl', SkimsCtrl);

function SkimsCtrl(Skim) {
  var self = this;
  Skim.list()
    .success(function(skims) {
      self.skims = skims;
    })
}



})();
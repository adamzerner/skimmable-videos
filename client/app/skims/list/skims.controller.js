(function() {



'use strict';

angular.module('skimmableVideosApp')
  .controller('SkimsCtrl', SkimsCtrl);

function SkimsCtrl(Skim) {
  var vm = this;
  Skim.list()
    .success(function(skims) {
      vm.skims = skims;
    });
}



})();
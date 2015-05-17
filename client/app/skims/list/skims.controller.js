(function() {



'use strict';

angular.module('skimmableVideosApp')
  .controller('SkimsCtrl', SkimsCtrl);

function SkimsCtrl(Skim, $stateParams) {
  var vm = this;
  if ($stateParams.text) {
    Skim.search($stateParams.text)
      .success(function(skims) {
        vm.skims = skims;
      });
  }
  else {
    Skim.list()
      .success(function(skims) {
        vm.skims = skims;
      });
  }
}



})();
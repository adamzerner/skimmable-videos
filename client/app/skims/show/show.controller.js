(function() {



'use strict';

angular.module('skimmableVideosApp')
  .controller('ShowCtrl', ShowCtrl);

function ShowCtrl (Skim, $stateParams) {
  var vm = this;
  Skim.get($stateParams.id)
    .success(function(skim) { 
      vm.skim = skim;
      vm.getDuration = function() {
        var duration = '(';
        if (vm.skim.hours > 0) duration += vm.skim.hours + ' hours, ';
        duration += vm.skim.minutes + ' minutes, ';
        duration += vm.skim.seconds + ' seconds)'
        return duration;
      };
    });
}



})();
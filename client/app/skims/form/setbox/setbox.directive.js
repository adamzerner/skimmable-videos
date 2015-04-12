(function() {



'use strict';

// used to set the thumbnail and start time of sections and subsections

angular.module('skimmableVideosApp')
  .directive('setbox', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/skims/form/setbox/setbox.html',
      scope: {
        curr: '=',
        player: '='
      },
      bindToController: true,
      controller: SetboxCtrl,
      controllerAs: 'setboxCtrl'
    };
  });

function SetboxCtrl() {
  var vm = this;
  vm.set = function() {
    var elapsedSeconds = vm.player.getCurrentTime();
    vm.curr.hour = Math.floor(elapsedSeconds / (60*60));
    elapsedSeconds -= vm.curr.hour*60*60;
    vm.curr.minute = Math.floor(elapsedSeconds/60);
    elapsedSeconds -= vm.curr.minute*60;
    vm.curr.second = Math.round(10*elapsedSeconds)/10;
  };
}



})();
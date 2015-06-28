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
        player: '=',
        hours: '='
      },
      bindToController: true,
      controller: SetboxCtrl,
      controllerAs: 'setboxCtrl'
    };
  });

function SetboxCtrl() {
  var vm = this;
  var prev = {
    elapsedSeconds: null,
    hour: null,
    minute: null,
    second: null
  };
  vm.set = function() {
    var elapsedSeconds = vm.player.getCurrentTime();
    
    if (elapsedSeconds === prev.elapsedSeconds) {
      // don't update the start time if it's unchanged. it messes us the back button.
      return;
    }
    
    prev.elapsedSeconds = elapsedSeconds;
    prev.hour = vm.curr.hour;
    prev.minute = vm.curr.minute;
    prev.second = vm.curr.second;

    vm.curr.hour = Math.floor(elapsedSeconds / (60*60));
    elapsedSeconds -= vm.curr.hour*60*60;
    vm.curr.minute = Math.floor(elapsedSeconds/60);
    elapsedSeconds -= vm.curr.minute*60;
    vm.curr.second = Math.round(10*elapsedSeconds)/10;
  };
  vm.back = function() {
    prev.elapsedSeconds = null;
    vm.curr.hour = prev.hour;
    vm.curr.minute = prev.minute;
    vm.curr.second = prev.second;
  };
}



})();
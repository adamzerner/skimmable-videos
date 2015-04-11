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
  this.set = function() {
    var elapsedSeconds = this.player.getCurrentTime();
    this.curr.hour = Math.floor(elapsedSeconds / (60*60));
    elapsedSeconds -= this.curr.hour*60*60;
    this.curr.minute = Math.floor(elapsedSeconds/60);
    elapsedSeconds -= this.curr.minute*60;
    this.curr.second = Math.round(10*elapsedSeconds)/10;
  };
}



})();
(function() {



'use strict';

// used to set the thumbnail and start time of sections and subsections

angular.module('skimmableVideosApp')
  .directive('setbox', function () {
    return {
      restrict: 'E',
      templateUrl: 'app/skims/setbox/setbox.html',
      scope: {
        curr: '=',
        player: '='
      },
      bindToController: true,
      controller: SetboxCtrl,
      controllerAs: 'setboxCtrl'
    };
  });

function SetboxCtrl(Player) {
  this.set = function() {
    console.log('Player.player: ', Player.player);
  };
}



})();
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
        duration += vm.skim.seconds + ' seconds)';
        return duration;
      };
      getSkimDurations();      
    });

  vm.play = function(player, subsection) {
    var seconds = subsection.hour*60*60 + subsection.minute*60 + subsection.second;
    player.seekTo(seconds);
    player.playVideo();
  };

  function getSkimDurations() {
    var curr, next, currStart, nextStart, hours, minutes, seconds, noSubsections;
    debugger;
    for (var i = 0, len = vm.skim.sections.length; i < len; i++) {
      curr = vm.skim.sections[i];
      next = vm.skim.sections[i+1] 
                  || curr.subsections[curr.subsections.length-1]; // last section
      if (!next) {
        next = vm.skim; // last section AND no subsections
        noSubsections = true;
      }
      currStart = curr.hour*60*60 + curr.minute*60 + curr.second;
      if (noSubsections) nextStart = next.hours*60*60 + next.minutes*60 + next.seconds;
      else nextStart = next.hour*60*60 + next.minute*60 + next.second;
      seconds = nextStart - currStart;
      hours = Math.floor(seconds/60/60);
      seconds -= hours*60*60;
      minutes = Math.floor(seconds/60);
      seconds -= minutes*60;
      curr.duration = '(';
      if (hours >= 2) curr.duration += hours + ' hours, ';
      else if (hours === 1) curr.duration += hours + 'hour, ';
      if (minutes >= 2) curr.duration += minutes + ' minutes, ';
      else if (minutes === 1) curr.duration += minutes + ' minute, ';
      if (seconds >= 2) curr.duration += Math.round(seconds) + ' seconds)';
      else curr.duration += Math.round(seconds) + ' second)';
    }
  }
}



})();
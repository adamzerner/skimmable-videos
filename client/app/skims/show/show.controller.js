(function() {



'use strict';

angular.module('skimmableVideosApp')
  .controller('ShowCtrl', ShowCtrl);

function ShowCtrl (Skim, $stateParams, Preview, Utils, User, Auth) {
  var vm = this;

  if ($stateParams.id) { // show
    vm.state = 'show';
    Skim.get($stateParams.id)
      .success(function(skim) {
        vm.skim = skim;     
      })
      .then(afterSkimRetrieved);
  }
  else { // preview
    vm.state = 'preview';
    Preview.get($stateParams.previewId)
      .success(function(skim) {
        vm.skim = skim;
      })
      .then(afterSkimRetrieved);
  }

  function afterSkimRetrieved() {
    vm.getDuration = function() {
      var duration = '(';
      if (vm.skim.hours > 0) duration += vm.skim.hours + ' hours, ';
      duration += vm.skim.minutes + ' minutes, ';
      duration += vm.skim.seconds + ' seconds)';
      return duration;
    };
    getSkimDurations();
    setStartTimes();
  }

  vm.play = function(player, subsection) {
    var seconds = subsection.hour*60*60 + subsection.minute*60 + subsection.second;
    player.seekTo(seconds);
    player.playVideo();
  };

  vm.star = function() {
    var currUser = Auth.getCurrentUser();
    var index;
    if (!vm.starred()) {
      currUser.starredSkims.push(vm.skim._id);
      User.save(currUser);
    }
    else {
      index = currUser.starredSkims.indexOf(vm.skim._id);
      currUser.starredSkims.splice(index, 1);
      User.save(currUser);
    }
  };

  vm.starred = function() {
    if (Auth.isLoggedIn()) {
      var currUser = Auth.getCurrentUser();
      if (currUser.starredSkims.indexOf(vm.skim._id) !== -1) {
        return true;
      }
    }
    return false;
  };

  vm.loggedIn = function() {
    return Auth.isLoggedIn();
  };

  function getSkimDurations() {
    var curr, next, currStart, nextStart, hms;
    for (var i = 0, len = vm.skim.sections.length; i < len; i++) {
      curr = vm.skim.sections[i];
      next = vm.skim.sections[i+1];

      currStart = Utils.hmsToSecs(curr.hour, curr.minute, curr.second);
      if (next) nextStart = Utils.hmsToSecs(next.hour, next.minute, next.second);
      else nextStart = Utils.hmsToSecs(vm.skim.hours, vm.skim.minutes, vm.skim.seconds);
      
      hms = Utils.secsToHms(nextStart-currStart);
      curr.duration = hms.toString();
    }
  }

  function setStartTimes() {
    var curr;
    for (var i = 0, len = vm.skim.sections.length; i < len; i++) {
      curr = vm.skim.sections[i];
      curr.playerVars = {
        start: Utils.hmsToSecs(curr.hour, curr.minute, curr.second)
      };
    }
  }
}



})();
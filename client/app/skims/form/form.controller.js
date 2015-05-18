(function() {


'use strict';

angular.module('skimmableVideosApp')
  .controller('FormCtrl', FormCtrl);

function FormCtrl($stateParams, $http, API_KEY, Auth, Skim, Preview, Draft, $timeout, $location) {
  var vm = this;
  vm.draftId = $stateParams.draftId;
  vm.skim = {
    author: Auth.getCurrentUser()._id,
    sections: [
      { subsections: [{}] }
    ]
  };

  // CREATE
  if ($stateParams.videoId) {
    var videoId = $stateParams.videoId;
    vm.state = 'Create';

    $http.get('https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+contentDetails&id='+videoId+'&key='+API_KEY)
      .success(function(result) {
        var item = result.items[0];
        vm.skim.title = item.snippet.title;
        vm.skim.description = item.snippet.description;
        vm.skim.url = 'https://www.youtube.com/watch?v=' + videoId;
        vm.skim.thumbnail = item.snippet.thumbnails.default.url;
        var duration = window.nezasa.iso8601.Period.parse(item.contentDetails.duration, true);
        vm.skim.hours = duration[4];
        vm.skim.minutes = duration[5];
        vm.skim.seconds = duration[6];
      })
      .error(function() {
        console.error('YouTube API request failed.');
      });
  }
  // UPDATE
  else if ($stateParams.id) {
    vm.state = 'Update';
    Skim.get($stateParams.id)
      .success(function(skim) {
        vm.skim = skim;
        vm.skim.author = vm.skim.author._id;
      });
  }
  // DRAFT
  else if (vm.draftId) {
    vm.state = 'Create';
    Draft.get(vm.draftId)
      .success(function(draft) {
        vm.skim = draft;
        vm.skim.author = vm.skim.author._id;
      });
  }

  vm.addSection = function() {
    vm.skim.sections.push({
      subsections: [{}]
    });
  };

  vm.removeSection = function(section) {
    var index = vm.skim.sections.indexOf(section);
    vm.skim.sections.splice(index, 1);
  };

  vm.submit = function() {
    if (vm.state === 'Create') {
      if (vm.draftId) {
        Draft.delete(vm.draftId)
          .success(function() {
            vm.skim.author = Auth.getCurrentUser()._id; // when a Skim is created, make sure the author is the person who clicked Create. this might not be the Draft author.
            Skim.create(vm.skim);
          });
      }
      else {
        Skim.create(vm.skim);
      }
    }
    else if (vm.state = 'Update') {
      Skim.update(vm.skim);
    }
  };

  vm.preview = function() {
    Preview.create(vm.skim); // creates preview and goes to view in new tab
  };

  vm.saveToDrafts = function() {
    if (vm.draftId) {
      Draft.update(vm.draftId, vm.skim)
        .success(function() {
          vm.flash = true;
          $timeout(function() {
            vm.flash = false;
          }, 1000);
        });
    }
    else {  
      Draft.create(vm.skim)
        .success(function(draft) {
          vm.draftId = draft._id;
          vm.flash = true;
          $timeout(function() {
            vm.flash = false;
          }, 1000);
        });
    }
  };

  vm.canShare = function() {
    // can only shrea if a) it's a draft page and b) you're the author of the draft
    return !!$stateParams.draftId && vm.skim.author === Auth.getCurrentUser()._id;
  };
  vm.popoverTemplate = 'popoverTemplate.html';
  vm.link = $location.absUrl();
  vm.triggerSharePopoverLinkFocus = function() {
    angular.element('#sharePopoverLink').select();
  };
}


})();
(function() {


'use strict';

angular.module('skimmableVideosApp')
  .controller('FormCtrl', FormCtrl);

function FormCtrl($stateParams, $http, API_KEY, Auth, Skim, Preview) {
  var vm = this;
  vm.skim = {
    author: Auth.getCurrentUser()._id,
    sections: [
      { subsections: [{}] }
    ]
  };

  // CREATE
  if (typeof $stateParams.id === 'undefined') {
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
  else {
    vm.state = 'Update';
    Skim.get($stateParams.id)
      .success(function(skim) {
        vm.skim = skim;
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
    Skim.save(vm.skim);
  };

  vm.preview = function() {
    Preview.create(vm.skim); // creates preview and goes to view in new tab
  };
}


})();
(function() {


'use strict';

angular.module('skimmableVideosApp')
  .controller('FormCtrl', FormCtrl);

function FormCtrl($scope, $stateParams, $http, API_KEY, Auth, Player) {
  this.skim = {
    author: Auth.getCurrentUser(),
    sections: [
      { subsections: [{}] }
    ]
  };

  this.player = Player.player;
  // Player.player = this.player -> undefined when set() is called

  this.getTime = function() {
    var elapsedSeconds = $scope.player.getCurrentTime();
    var hour = Math.floor(elapsedSeconds / (60*60));
    elapsedSeconds -= hour*60*60;
    var minute = Math.floor(elapsedSeconds/60);
    elapsedSeconds -= minute*60;
    var second = Math.round(10*elapsedSeconds)/10;
    console.log(hour + ', ' + minute + ', ' + second);
  };

  // CREATE
  if (typeof $stateParams.id === 'undefined') {
    var videoId = $stateParams.videoId;
    this.state = 'create';

    var self = this;
    $http.get('https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+contentDetails&id='+videoId+'&key='+API_KEY)
      .success(function(result) {
        var item = result.items[0];
        self.skim.title = item.snippet.title;
        self.skim.description = item.snippet.description;
        self.skim.url = 'https://www.youtube.com/watch?v=' + videoId;
        self.skim.embedUrl = 'https://www.youtube.com/embed/' + videoId + '?showinfo=0&enablejsapi=1'
        var duration = window.nezasa.iso8601.Period.parse(item.contentDetails.duration, true);
        self.skim.hours = duration[4];
        self.skim.minutes = duration[5];
        self.skim.seconds = duration[6];
      })
      .error(function() {
        console.error('YouTube API request for ' + self.skim.url + ' failed.');
      });
  }
  // EDIT
  else {
    this.state = 'edit';
    this.skim.id = $stateParams.id;
    // query for skim and update this.skim
  }

  this.addSection = function() {
    this.skim.sections.push({
      subsections: [{}]
    });
  };
}


})();
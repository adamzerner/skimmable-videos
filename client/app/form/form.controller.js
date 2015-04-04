(function() {


'use strict';

angular.module('skimmableVideosApp')
  .controller('FormCtrl', FormCtrl);

function FormCtrl($stateParams, $http, API_KEY) {
  this.skim = {
    sections: [
      { subsections: [{}] }
    ]
  };

  $("#test").markdown({autofocus:false,savable:false});

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
        self.skim.url = 'https://www.youtube.com/watch?v='+videoId;
        self.skim.embedUrl = youtubeToEmbed(self.skim.url);
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

function youtubeToEmbed(url) {
  var id = getIdFromUrl(url);
  return 'https://www.youtube.com/embed/' + id + '?showinfo=0&enablejsapi=1'; // removed &origin=http://localhost:9000
}

function getIdFromUrl(url) {
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length == 11) {
    return match[2];
  } 
  else {
    throw new Error('problem getting id from youtube url');
  }
}



})();
(function() {


'use strict';

angular.module('skimmableVideosApp')
  .controller('UploadCtrl', UploadCtrl);

function UploadCtrl($state, youtubeEmbedUtils) {
  this.upload = function() {
    var id = youtubeEmbedUtils.getIdFromURL(this.url);
    $state.go('create', {videoId: id});
  };

}


})();
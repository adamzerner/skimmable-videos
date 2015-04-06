(function() {


'use strict';

angular.module('skimmableVideosApp')
  .controller('UploadCtrl', UploadCtrl);

function UploadCtrl($state, youtubeEmbedUtils) {
  this.upload = function() {
    var id = youtubeEmbedUtils.getIdFromUrl(this.url);
    $state.go('create', {videoId: id});
  };

}


})();
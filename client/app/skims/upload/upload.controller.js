(function() {


'use strict';

angular.module('skimmableVideosApp')
  .controller('UploadCtrl', UploadCtrl);

function UploadCtrl($state, youtubeEmbedUtils) {
  var vm = this;
  vm.upload = function() {
    var id = youtubeEmbedUtils.getIdFromURL(this.url);
    $state.go('create', {videoId: id});
  };

}


})();
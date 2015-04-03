(function() {


'use strict';

angular.module('skimmableVideosApp')
  .controller('UploadCtrl', UploadCtrl);

function UploadCtrl($state) {
  this.upload = function() {
    var id = getIdFromUrl(this.url);
    $state.go('create', {videoId: id});
  };

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
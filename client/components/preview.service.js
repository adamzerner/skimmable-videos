'use strict';

angular.module('skimmableVideosApp')
  .service('Preview', function($http, $state, $timeout) {
    // need to save to server to allow the user to retrieve preview in a new tab
    // since Angular is a SPA, the new tab doesn't have all the data. local storage doesn't work either
    this.create = function(skim) {
      $http.post('/api/previews', skim)
        .success(function(preview) {
          var url = $state.href('preview', {previewId: preview._id});
          window.open(url, '_blank');
        })
        .error(function() {
          console.error('Unable to create preview.');
        });
    };

    this.get = function(previewId) {
      $timeout(function() {
        $http.delete('/api/previews/'+previewId);
      }, 10000);
      return $http.get('/api/previews/'+previewId)
    };
  });
'use strict';

angular.module('skimmableVideosApp')
  .service('Draft', function ($http, User) {
    this.index = function() {
      $http.get('/api/drafts');
    };
    this.get = function(id) {
      return $http.get('/api/drafts/'+id);
    };
    this.create = function(draft) {
      var author_id = draft.author;
      return $http.post('/api/drafts', draft)
    };
    this.update = function(id, draft) {
      return $http.put('/api/drafts/'+id, draft);
    };
    this.delete = function(id) {
      $http.delete('/api/drafts/'+id);
    };
  });

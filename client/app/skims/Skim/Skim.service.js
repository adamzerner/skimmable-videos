angular.module('skimmableVideosApp')
  .service('Skim', function($http, $state, User, Auth, Draft) {
    this.create = function(skim) {
      $http.post('/api/skims', skim)
        .success(function(skim) {
          // add to current user's skims
          var currentUser = Auth.getCurrentUser();
          currentUser.skimsCreated.push(skim._id);
          User.save(currentUser, function() {
            $state.go('skims');
          });
        })
        .error(function() {
          console.error('Unable to create skim.');
        });
    };
    this.update = function(skim) {
      $http.put('/api/skims/'+skim._id, skim)
        .success(function(skim) {
          $state.go('show', {id: skim._id});
        })
        .error(function() {
          console.error('Unable to update skim.');
        });
    }
    this.list = function() {
      return $http.get('/api/skims');
    };

    this.get = function(id) {
      return $http.get('/api/skims/'+id);
    };

    this.search = function(text) {
      return $http.get('/api/skims/search/'+text);
    };

    this.delete = function(id) {
      $http.delete('/api/skims/'+id)
        .success(function() {
          $state.go($state.current, {}, {reload: true});
        })
    };
  });
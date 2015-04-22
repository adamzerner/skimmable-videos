angular.module('skimmableVideosApp')
  .service('Skim', function($http, $state, User, Auth) {
    this.save = function(skim) {
      // create or update depending on whether _id is present
      if (skim._id) {
        $http.put('/api/skims/'+skim._id, skim)
          .success(function(skim) {
            $state.go('show', {id: skim._id});
          })
          .error(function() {
            console.error('Unable to update skim.');
          });
      }
      else  {
        $http.post('/api/skims', skim)
          .success(function(skim) {
            var currentUser = Auth.getCurrentUser();
            currentUser.skimsCreated.push(skim._id);
            User.save(currentUser, function() {
              $state.go('skims');
            });
          })
          .error(function() {
            console.error('Unable to create skim.');
          });
      }
    };
    this.list = function() {
      return $http.get('/api/skims');
    };

    this.get = function(id) {
      return $http.get('/api/skims/'+id);
    };

    this.delete = function(id) {
      $http.delete('/api/skims/'+id)
        .success(function() {
          $state.go($state.current, {}, {reload: true});
        })
    };
  });
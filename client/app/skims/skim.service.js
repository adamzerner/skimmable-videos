angular.module('skimmableVideosApp')
  .service('Skim', function($http) {
    this.save = function(skim) {
      // create or update depending on whether _id is present
      if (skim._id) {
        console.log('update');
        return $http.put('/api/skims/'+skim_id, skim)
      }
      else  {
        console.log('create');
        return $http.post('/api/skims', skim)
      }
    };

    this.list = function() {
      return $http.get('/api/skims');
    };
  });
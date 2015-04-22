(function() {


'use strict';

angular.module('skimmableVideosApp')
  .controller('UserCtrl', UserCtrl);

function UserCtrl(User, $stateParams, Auth, Skim) {
  var vm = this;
  vm.user = User.get({id: $stateParams.id});
  vm.isAuthorized = function() {
    if (Auth.isLoggedIn() && Auth.getCurrentUser()._id === vm.user._id) {
      return true;
    }
    return false;
  };
  vm.delete = function(id) {
    Skim.delete(id);
  };
}



})();
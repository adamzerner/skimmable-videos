(function() {


'use strict';

angular.module('skimmableVideosApp')
  .controller('ProfileCtrl', ProfileCtrl);

function ProfileCtrl(User, $stateParams, Auth, Skim, Draft) {
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
  vm.deleteDraft = function(id) {
    Draft.delete(id);
  };
}



})();
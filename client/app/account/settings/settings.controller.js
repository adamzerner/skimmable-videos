(function() {


'use strict';

angular.module('skimmableVideosApp')
  .controller('SettingsCtrl', SettingsCtrl);

function SettingsCtrl(Auth, User, $state) {
  var vm = this;
  vm.currUser = {};
  angular.copy(Auth.getCurrentUser(), vm.currUser);
  vm.update = function() {
    User.save(vm.currUser, function(user) {
      Auth.getCurrentUser().name = user.name; // to update navbar
      $state.go('user', {id: user._id}, {reload: true});
    });
  };
}



})();
(function() {


'use strict';

angular.module('skimmableVideosApp')
  .controller('SettingsCtrl', SettingsCtrl);

function SettingsCtrl(Auth, User, $state, $rootScope) {
  var vm = this;
  vm.currUser = Auth.getCurrentUser();
  vm.update = function() {
    User.save(vm.currUser, function(user) {
      $rootScope.$emit('refresh_navbar');
      $state.go('user', {id: user._id}, {reload: true});
    });
  };
}



})();
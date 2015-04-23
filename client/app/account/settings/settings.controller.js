(function() {


'use strict';

angular.module('skimmableVideosApp')
  .controller('SettingsCtrl', SettingsCtrl);

function SettingsCtrl(Auth, User, $state, $rootScope) {
  var vm = this;
  vm.currUser = Auth.getCurrentUser();
  vm.name = vm.currUser.name;
  vm.email = vm.currUser.email;
  vm.update = function() {
    vm.currUser.name = vm.name; // because annoying data binding problem with navbar
    vm.currUser.email = vm.email;
    User.save(vm.currUser, function(user) {
      $rootScope.$emit('refresh_navbar');
      $state.go('profile', {id: user._id}, {reload: true});
    });
  };
}



})();
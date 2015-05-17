'use strict';

angular.module('skimmableVideosApp')
  .controller('NavbarCtrl', function ($scope, $rootScope, $location, Auth, $state) {
    $scope.menu = [{
      'title': 'Skims',
      'link': '/skims'
    }, {
      'title': 'Create',
      'link': '/upload'
    }, {
      'title': 'Help',
      'link': '/help'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.currentUser = Auth.getCurrentUser();

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(state) {
      return state === $state.current.name;
    };

    $scope.search = function() {
      $state.go('skims', {text: $scope.searchText}, {reload: true});
    };

    $rootScope.$on('refresh_navbar', function() {
      $scope.currentUser = Auth.getCurrentUser();
    });
  });
  
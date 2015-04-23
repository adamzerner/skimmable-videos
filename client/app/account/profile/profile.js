'use strict';

angular.module('skimmableVideosApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile/:id',
        templateUrl: 'app/account/profile/profile.html',
        controller: 'ProfileCtrl as profileCtrl'
      });
  });
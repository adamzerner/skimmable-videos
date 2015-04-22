'use strict';

angular.module('skimmableVideosApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('user', {
        url: '/user/:id',
        templateUrl: 'app/account/user/user.html',
        controller: 'UserCtrl as userCtrl'
      });
  });
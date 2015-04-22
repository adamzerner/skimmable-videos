'use strict';

angular.module('skimmableVideosApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .state('signup', {
        url: '/signup',
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('change-password', {
        url: '/change-password',
        templateUrl: 'app/account/change_password/change_password.html',
        controller: 'ChangePasswordCtrl',
        authenticate: true
      });
  });
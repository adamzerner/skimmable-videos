'use strict';

angular.module('skimmableVideosApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('create', {
        url: '/create/:videoId',
        templateUrl: 'app/form/form.html',
        controller: 'FormCtrl as formCtrl',
        authenticate: {
          loggedIn: true
        }
      })
      .state('edit', {
        url: '/edit/:id',
        templateUrl: 'app/form/form.html',
        controller: 'FormCtrl as formCtrl',
        authenticate: {
          loggedIn: true,
          authorized: true
        }
      });
  });
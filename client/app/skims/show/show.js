'use strict';

angular.module('skimmableVideosApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('show', {
        url: '/show/:id',
        templateUrl: 'app/skims/show/show.html',
        controller: 'ShowCtrl as showCtrl'
      });
  });
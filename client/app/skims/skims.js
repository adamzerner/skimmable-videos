'use strict';

angular.module('skimmableVideosApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('skims', {
        url: '/skims',
        templateUrl: 'app/skims/skims.html',
        controller: 'SkimsCtrl'
      });
  });
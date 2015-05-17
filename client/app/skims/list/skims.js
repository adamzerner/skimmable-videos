'use strict';

angular.module('skimmableVideosApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('skims', {
        url: '/skims?text',
        templateUrl: 'app/skims/list/skims.html',
        controller: 'SkimsCtrl as skimsCtrl'
      });
  });
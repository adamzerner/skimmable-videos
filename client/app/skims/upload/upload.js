'use strict';

angular.module('skimmableVideosApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('upload', {
        url: '/upload',
        templateUrl: 'app/skims/upload/upload.html',
        controller: 'UploadCtrl as uploadCtrl',
        authenticate: {
          loggedIn: true
        }
      });
  });
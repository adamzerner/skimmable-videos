'use strict';

angular.module('skimmableVideosApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'youtube-embed',
  'markdown'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        // Auth token causes 401
        if (config.url !== 'https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+contentDetails&id=vifsqv_QXB0&key=AIzaSyDngy9xWiBHwqSdYW1QVtvxn-8K8256wsI') {
          config.headers = config.headers || {};
          if ($cookieStore.get('token')) {
            config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
          }
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      if (typeof next.authenticate !== 'undefined') {
        Auth.isLoggedInAsync(function(loggedIn) {
          if (next.authenticate.loggedIn && !loggedIn) {
            alert('Must be logged in to access this route.');
            $location.path('/login');
          }
          if (next.authenticate.authorized && Auth.getCurrentUser().id !== $location.url().split('/')[2]) {
            alert('Unauthorized. Must be signed in as the right user.');
            $location.path('/login');
          }
          if (next.authenticate.admin && !Auth.isAdmin()) {
            alert('Must be an admin to access this route.');
            $location.path('/login');
          }
        });
      }
    });
  });
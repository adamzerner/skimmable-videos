'use strict';

angular.module('skimmableVideosApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
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
        if (config.url.indexOf('https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+contentDetails')) {
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

  .run(function ($rootScope, $location, Auth, Skim, Draft) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next, params) {
      if (typeof next.authenticate !== 'undefined') {
        Auth.isLoggedInAsync(function(loggedIn) {
          if (next.authenticate.authorized) {
            if (next.authenticate.authorized === 'skim') {
              // look up skim's author using params.id
              // make sure it is equal to Auth.getCurrentUser()._id
              Skim.get(params.id)
                .success(function(skim) {
                  if (Auth.getCurrentUser()._id !== skim.author) {
                    alert("You aren't authorized to access this route.");
                    $location.path('/login');
                  }
                });
            }
            else if (next.authenticate.authorized === 'draft') {
              Draft.get(params.draftId)
                .success(function(draft) {
                  console.log('in success');
                  if (Auth.getCurrentUser()._id !== draft.author) {
                    alert("You aren't authorized to access this route.");
                    $location.path('/login');
                  }
                })
                .error(function() {
                  console.log('error');
                });
            }
          }
          if (next.authenticate.loggedIn && !loggedIn) {
            alert('Must be logged in to access this route.');
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
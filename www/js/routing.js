angular.module('starter')

  .config(function($stateProvider, $urlRouterProvider ) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.search', {
      url: '/search',
      views: {
        'menuContent': {
          templateUrl: 'templates/search.html',
          controller: 'search'
        }
      }
    })

    .state('app.mystore', {
      url: '/mystore',
      views: {
        'menuContent': {
          templateUrl: 'templates/mystore.html',
          controller:'mystore'
        }
      }
    })
    .state('app.log', {
      url: '/log',
      views: {
        'menuContent': {
          templateUrl: 'templates/log.html',
          controller:'logs',
        }
      }
    })
    .state('app.login', {
        url: '/login',
        views: {
          'menuContent': {
            templateUrl: 'templates/login.html'

          }
        }
      });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
})

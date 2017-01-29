'use strict';

/**
 * @ngdoc overview
 * @name rssHerokuappApp
 * @description
 * # rssHerokuappApp
 *
 * Main module of the application.
 */
angular
  .module('rssHerokuappApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

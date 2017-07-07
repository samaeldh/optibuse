'use strict';

/**
 * @ngdoc overview
 * @name optibuseApp
 * @description
 * # optibuseApp
 *
 * Main module of the application.
 */
angular
  .module('optibuseApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/pulve', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/buse', {
        templateUrl: 'views/buses.html',
        controller: 'BusesCtrl',
        controllerAs: 'buses'
      })
      .otherwise({
        redirectTo: '/pulve'
      });

      // use the HTML5 History API
      $locationProvider.html5Mode({
        enabled: true,
        rewriteLinks: true
    });
  });

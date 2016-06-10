'use strict';

/**
 * @ngdoc overview
 * @name pulsetotemGuestBookClientApp
 * @description
 * # routes
 *
 * Define routes available in application.
 */
angular
  .module('pulsetotemPhotoboxClientApp')
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider

      // Routes for home
      .when('/', {
        templateUrl: '../common/views/home.html',
        controller: 'PulseTotemCommon.HomeCtrl'
      })

      // Routes for screen control
      .when('/session/:socketid', {
        templateUrl: '../control/views/session.html',
        controller: 'PulseTotemControl.SessionCtrl'
      })

      // All other stuff
      .otherwise({
        redirectTo: '/'
      });
  }]);

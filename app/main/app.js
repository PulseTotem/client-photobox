'use strict';

/**
 * @ngdoc overview
 * @name pulsetotemGuestBookClientApp
 * @description
 * # pulsetotemGuestBookClientApp
 *
 * Main module of the application.
 */
angular
    .module('pulsetotemPhotoboxClientApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngMaterial',
    'pascalprecht.translate',
    'btford.socket-io',
    'PulseTotemCommon',
    'PulseTotemControl'
    ])
  .config(['$locationProvider', function($locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');
  }])
  .config(['$mdThemingProvider', function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey', {
        'default' : '600'
      })
      .accentPalette('blue');
  }])
;

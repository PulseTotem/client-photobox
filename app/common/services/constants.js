'use strict';

/**
 * @ngdoc function
 * @name pulsetotemGuestBookClientApp.PulseTotemCommon.constant:Constants
 * @description
 * Constants for the pulsetotemGuestBookClientApp
 */
angular.module('PulseTotemCommon')
    .constant('CONSTANTS', {
        //backendUrl: 'http://localhost:4000/',
        backendUrl: 'http://backend.pulsetotem.fr/',
        //backendUrl: 'http://backend-test.pulsetotem.fr/',
        loginBackendPath: 'login',
        loginFromTokenBackendPath: 'loginFromToken',
        homeRoute: '/',
        afterLoginRoute: '/dashboard',

        //photoboxServiceUrl: 'http://localhost:6012/',
        photoboxServiceUrl: 'http://service-photobox.pulsetotem.fr/',
        //photoboxServiceUrl: 'http://service-photobox-test.pulsetotem.fr/',
        photoboxClientPath: 'PhotoboxClient'
    });

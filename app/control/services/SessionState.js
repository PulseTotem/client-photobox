'use strict';

/**
 * @ngdoc function
 * @name pulsetotemGuestBookClientApp.PulseTotemCommon.constant:Constants
 * @description
 * Constants for the pulsetotemGuestBookClientApp
 */
angular.module('PulseTotemControl')
  .constant('SessionState', {
    connecting: 0,
    waiting: 1,
    connected: 2,
    counting: 3,
    waitingDecision: 4,
    waitingValidation: 5,
    decisionReceived: 6
});

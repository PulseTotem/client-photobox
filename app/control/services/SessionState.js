'use strict';

/**
 * @ngdoc function
 * @name pulsetotemGuestBookClientApp.PulseTotemCommon.constant:Constants
 * @description
 * Constants for the pulsetotemGuestBookClientApp
 */
angular.module('PulseTotemControl')
  .constant('SessionState', {
    connecting: 'CONNECTING',
    waiting: 'WAITING',
    connected: 'CONNECTED',
    counting: 'COUNTING',
    waitingDecision: 'WAITINGDECISION',
    waitingValidation: 'WAITINGVALIDATION',
    decisionReceived: 'DECISIONRECEIVED'
});

'use strict';

/**
 * @ngdoc function
 * @name pulsetotemGuestBookClientApp.factory:photoboxSocket
 * @description
 * # photoboxSocket Factory
 * Factory of the pulsetotemGuestBookClientApp
 */
angular.module('PulseTotemCommon')
  .factory('photoboxSocket', ['$rootScope', 'CONSTANTS', 'callbackManager', 'socketFactory', function ($rootScope, CONSTANTS, callbackManager, socketFactory) {
    var photoboxSocketFactory = {};
    photoboxSocketFactory.photoboxSocket = null;

    photoboxSocketFactory.init = function(callSocketId, successCB, failCB) {
      var guestBookIOSocket = io(CONSTANTS.guestBookServiceUrl + CONSTANTS.guestBookClientPath,
        {
          'reconnection': true,
          'reconnectionAttempts': 10,
          'reconnectionDelay': 1000,
          'reconnectionDelayMax': 5000,
          'timeout': 5000,
          'autoConnect': true,
          'multiplex': false
        });

      guestBookIOSocket.on("connect", function () {
        successCB();
      });

      guestBookIOSocket.on("error", function (errorData) {
        console.error("An error occurred during connection to GuestBookService.");
        console.log(errorData);
        failCB("An error occurred during connection to GuestBookService.");
      });

      guestBookIOSocket.on("disconnect", function () {
        console.info("Disconnected from GuestBookService.");
      });

      guestBookIOSocket.on("reconnect", function (attemptNumber) {
        console.info("Connected to GuestBookService after " + attemptNumber + " attempts.");
      });

      guestBookIOSocket.on("reconnect_attempt", function () {
        console.info("Trying to reconnect to GuestBookService.");
      });

      guestBookIOSocket.on("reconnecting", function (attemptNumber) {
        console.info("Trying to connect to GuestBookService - Attempt number " + attemptNumber + ".");
      });

      guestBookIOSocket.on("reconnect_error", function (errorData) {
        console.error("An error occurred during reconnection to GuestBookService.");
        console.log(errorData);
      });

      guestBookIOSocket.on("reconnect_failed", function () {
        console.error("Failed to connect to GuestBookService. New attempt will be done in 5 seconds. Administrators received an Alert !");
        //TODO: Send an email and Notification to Admins !

        setTimeout(function() {
          photoboxSocketFactory.photoboxSocket = null;
          photoboxSocketFactory.init(callSocketId, successCB, failCB);
        }, 5000);
      });

      var photoboxSocket = socketFactory({
        ioSocket: guestBookIOSocket
      });

      photoboxSocketFactory.photoboxSocket = photoboxSocket;
    };

    photoboxSocketFactory.exit = function() {
      photoboxSocketFactory.photoboxSocket = null;
    };

    photoboxSocketFactory.on = function() {
      if(photoboxSocketFactory.photoboxSocket != null) {
        photoboxSocketFactory.photoboxSocket.removeAllListeners(arguments[0]);
        photoboxSocketFactory.photoboxSocket.on.apply(this,arguments);
      } else {
        console.error("An error occurred : GuestBookService isn't initialized.");
      }
    };

    photoboxSocketFactory.addListener = function() {
      if(photoboxSocketFactory.photoboxSocket != null) {
        photoboxSocketFactory.photoboxSocket.removeAllListeners(arguments[0]);
        photoboxSocketFactory.photoboxSocket.addListener.apply(this,arguments);
      } else {
        console.error("An error occurred : GuestBookService isn't initialized.");
      }
    };

    photoboxSocketFactory.removeListener = function() {
      if(photoboxSocketFactory.photoboxSocket != null) {
        photoboxSocketFactory.photoboxSocket.removeListener.apply(this,arguments);
      } else {
        console.error("An error occurred : GuestBookService isn't initialized.");
      }
    };

    photoboxSocketFactory.removeAllListeners = function() {
      if(photoboxSocketFactory.photoboxSocket != null) {
        photoboxSocketFactory.photoboxSocket.removeAllListeners.apply(this,arguments);
      } else {
        console.error("An error occurred : GuestBookService isn't initialized.");
      }
    };

    photoboxSocketFactory.emit = function() {
      if(photoboxSocketFactory.photoboxSocket != null) {
        photoboxSocketFactory.photoboxSocket.emit.apply(this,arguments);
      } else {
        console.error("An error occurred : GuestBookService isn't initialized.");
      }
    };

    photoboxSocketFactory.forward = function() {
      if(photoboxSocketFactory.photoboxSocket != null) {
        photoboxSocketFactory.photoboxSocket.forward.apply(this,arguments);
      } else {
        console.error("An error occurred : GuestBookService isn't initialized.");
      }
    };

    return photoboxSocketFactory;
  }]);

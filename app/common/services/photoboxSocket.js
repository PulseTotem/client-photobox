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
      var photoboxIOSocket = io(CONSTANTS.photoboxServiceUrl + CONSTANTS.photoboxClientPath,
        {
          'reconnection': true,
          'reconnectionAttempts': 10,
          'reconnectionDelay': 1000,
          'reconnectionDelayMax': 5000,
          'timeout': 5000,
          'autoConnect': true,
          'multiplex': false
        });

      photoboxIOSocket.on("connect", function () {
        successCB();
      });

      photoboxIOSocket.on("error", function (errorData) {
        console.error("An error occurred during connection to PhotoboxService.");
        console.log(errorData);
        failCB("An error occurred during connection to PhotoboxService.");
      });

      photoboxIOSocket.on("disconnect", function () {
        console.info("Disconnected from PhotoboxService.");
      });

      photoboxIOSocket.on("reconnect", function (attemptNumber) {
        console.info("Connected to PhotoboxService after " + attemptNumber + " attempts.");
      });

      photoboxIOSocket.on("reconnect_attempt", function () {
        console.info("Trying to reconnect to PhotoboxService.");
      });

      photoboxIOSocket.on("reconnecting", function (attemptNumber) {
        console.info("Trying to connect to PhotoboxService - Attempt number " + attemptNumber + ".");
      });

      photoboxIOSocket.on("reconnect_error", function (errorData) {
        console.error("An error occurred during reconnection to PhotoboxService.");
        console.log(errorData);
      });

      photoboxIOSocket.on("reconnect_failed", function () {
        console.error("Failed to connect to PhotoboxService. New attempt will be done in 5 seconds. Administrators received an Alert !");
        //TODO: Send an email and Notification to Admins !

        setTimeout(function() {
          photoboxSocketFactory.photoboxSocket = null;
          photoboxSocketFactory.init(callSocketId, successCB, failCB);
        }, 5000);
      });

      var photoboxSocket = socketFactory({
        ioSocket: photoboxIOSocket
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
        console.error("An error occurred : PhotoboxService isn't initialized.");
      }
    };

    photoboxSocketFactory.addListener = function() {
      if(photoboxSocketFactory.photoboxSocket != null) {
        photoboxSocketFactory.photoboxSocket.removeAllListeners(arguments[0]);
        photoboxSocketFactory.photoboxSocket.addListener.apply(this,arguments);
      } else {
        console.error("An error occurred : PhotoboxService isn't initialized.");
      }
    };

    photoboxSocketFactory.removeListener = function() {
      if(photoboxSocketFactory.photoboxSocket != null) {
        photoboxSocketFactory.photoboxSocket.removeListener.apply(this,arguments);
      } else {
        console.error("An error occurred : PhotoboxService isn't initialized.");
      }
    };

    photoboxSocketFactory.removeAllListeners = function() {
      if(photoboxSocketFactory.photoboxSocket != null) {
        photoboxSocketFactory.photoboxSocket.removeAllListeners.apply(this,arguments);
      } else {
        console.error("An error occurred : PhotoboxService isn't initialized.");
      }
    };

    photoboxSocketFactory.emit = function() {
      if(photoboxSocketFactory.photoboxSocket != null) {
        photoboxSocketFactory.photoboxSocket.emit.apply(this,arguments);
      } else {
        console.error("An error occurred : PhotoboxService isn't initialized.");
      }
    };

    photoboxSocketFactory.forward = function() {
      if(photoboxSocketFactory.photoboxSocket != null) {
        photoboxSocketFactory.photoboxSocket.forward.apply(this,arguments);
      } else {
        console.error("An error occurred : PhotoboxService isn't initialized.");
      }
    };

    return photoboxSocketFactory;
  }]);

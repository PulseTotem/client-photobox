'use strict';

/**
 * @ngdoc function
 * @name pulsetotemGuestBookClientApp.controller:SessionCtrl
 * @description
 * # SessionCtrl
 * Controller of the pulsetotemGuestBookClientApp
 */
angular.module('PulseTotemControl')
  .controller('PulseTotemControl.SessionCtrl', ['$rootScope', '$scope', '$routeParams', 'photoboxSocket', 'callbackManager', function($rootScope, $scope, $routeParams, photoboxSocket, callbackManager) {
    $scope.connected = false;
    $scope.waiting = true;
    $scope.picture = null;

    $scope.startCounter = function() {
      console.log("Start counter !");
      photoboxSocket.emit("StartCounter", {'callSocketId': $routeParams.socketid});
    };

    $scope.isPictureAvailable = function() {
      return ($scope.picture !== null);
    };



    var initSession = function() {
      photoboxSocket.on("LockedControl", function (response) {
        callbackManager(response, function (sessionDesc) {
            $scope.$apply(function () {
              $rootScope.session = sessionDesc;
              if($rootScope.session._status == 'ACTIVE') {
                $scope.waiting = false;
              }
            });
          },
          function (fail) {
            console.error(fail);
            console.error("An error occurred during Locked Control.");
          }
        );
      });

      photoboxSocket.on("ControlSession", function (response) {
        callbackManager(response, function (sessionDesc) {
            $scope.$apply(function () {
              $rootScope.session = sessionDesc;
              if($rootScope.session._status == 'ACTIVE') {
                $scope.waiting = false;
              }
            });
          },
          function (fail) {
            console.error(fail);
            console.error("An error occurred during Taking Control on Screen.");
          }
        );
      });

      photoboxSocket.on("DisplayPicture", function (response) {
        callbackManager(response, function (pictureURL) {
          $scope.$apply(function () {
            $scope.picture = pictureURL;
          });
          },
          function (fail) {
            console.error(fail);
            console.error("An error occurred during Taking Control on Screen.");
          }
        );
      });

      if (typeof($rootScope.session) == "undefined" || typeof($rootScope.session._id) == "undefined") {
        photoboxSocket.emit("TakeControl", {'callSocketId': $routeParams.socketid});
      }
    };

    photoboxSocket.init($routeParams.socketid, function() {
      $scope.$apply(function () {
        $scope.connected = true;
        initSession();
      });
    }, function(err) {
      console.error(err);
    });
  }]);

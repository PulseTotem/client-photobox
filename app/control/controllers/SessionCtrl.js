'use strict';

/**
 * @ngdoc function
 * @name pulsetotemGuestBookClientApp.controller:SessionCtrl
 * @description
 * # SessionCtrl
 * Controller of the pulsetotemGuestBookClientApp
 */
angular.module('PulseTotemControl')
  .controller('PulseTotemControl.SessionCtrl', ['$rootScope', '$scope', '$routeParams', 'photoboxSocket', 'callbackManager', 'SessionState', function($rootScope, $scope, $routeParams, photoboxSocket, callbackManager, SessionState) {


    $scope.init = function () {
      $rootScope.session = null;
      $scope.status = SessionState.connecting;
      $scope.picture = null;
      $scope.isValidated = null;
    };

    $scope.init();

    $scope.startCounter = function() {
      console.log("Start counter !");
      photoboxSocket.emit("StartCounter", {'callSocketId': $routeParams.socketid});
      $scope.status = SessionState.counting;
    };

    $scope.validatePicture = function () {
      photoboxSocket.emit("ValidatePicture", {'callSocketId': $routeParams.socketid});
      $scope.status = SessionState.waitingValidation;
    };

    $scope.unvalidatePicture = function () {
      photoboxSocket.emit("UnvalidatePicture", {'callSocketId': $routeParams.socketid});
      $scope.status = SessionState.waitingValidation;
    };



    var initSession = function() {
      photoboxSocket.on("LockedControl", function (response) {
        callbackManager(response, function (sessionDesc) {
            $scope.$apply(function () {
              console.log("Lock control :"+sessionDesc._status);
              $rootScope.session = sessionDesc;
              if($rootScope.session._status == 'ACTIVE') {
                $scope.status = SessionState.connected;
              }
            });
          },
          function (fail) {
            console.error(fail);
            console.error("An error occurred during Locked Control.");
          }
        );
      });

      photoboxSocket.on("UnlockedControl", function (response) {
        callbackManager(response, function (sessionDesc) {
            $scope.$apply(function () {
              $scope.init();
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
              console.log("Control session :"+sessionDesc._status);
              $rootScope.session = sessionDesc;
              if($rootScope.session._status == 'ACTIVE') {
                $scope.status = SessionState.connected;
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
            $scope.status = SessionState.waitingDecision;
          });
          },
          function (fail) {
            console.error(fail);
            console.error("An error occurred during Taking Control on Screen.");
          }
        );
      });

      photoboxSocket.on("ValidatedPicture", function (response) {
        callbackManager(response, function (pictureURL) {
            $scope.$apply(function () {
              $scope.validated = true;
              $scope.status = SessionState.decisionReceived;
            });
          },
          function (fail) {
            console.error(fail);
            console.error("An error occurred during Taking Control on Screen.");
          }
        );
      });

      photoboxSocket.on("UnvalidatedPicture", function (response) {
        callbackManager(response, function (pictureURL) {
            $scope.$apply(function () {
              $scope.validated = false;
              $scope.status = SessionState.decisionReceived;
            });
          },
          function (fail) {
            console.error(fail);
            console.error("An error occurred during Taking Control on Screen.");
          }
        );
      });

      if ($rootScope.session === null || typeof($rootScope.session) == "undefined" || typeof($rootScope.session._id) == "undefined") {
        console.log("Take control !");
        photoboxSocket.emit("TakeControl", {'callSocketId': $routeParams.socketid});
      }
    };

    photoboxSocket.init($routeParams.socketid, function() {
      $scope.$apply(function () {
       initSession();
      });
    }, function(err) {
      console.error(err);
    });
  }]);

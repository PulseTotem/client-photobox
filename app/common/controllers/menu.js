'use strict';

/**
 * @ngdoc function
 * @name pulsetotemGuestBookClientApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the pulsetotemGuestBookClientApp
 */
angular.module('PulseTotemCommon')
    .controller('PulseTotemCommon.MenuCtrl', ['$rootScope', '$scope', '$translate', 'backendSocket', '$cookies', '$location', 'CONSTANTS', function ($rootScope, $scope, $translate, backendSocket, $cookies, $location, CONSTANTS) {

        $scope.langKey = $translate.use();

        $scope.changeLanguage = function (langKey) {
          $scope.langKey = langKey;
          $translate.use(langKey);
        };

    }]);

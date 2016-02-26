'use strict';

/**
 * @ngdoc overview
 * @name pulsetotemGuestBookClientApp
 * @description
 * # translation
 *
 * Define translation configuration for application.
 */
angular
    .module('pulsetotemPhotoboxClientApp')
    .config(['$translateProvider', function($translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: '/locales/locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('fr');
        $translateProvider.fallbackLanguage(['fr', 'en']);
        $translateProvider.useSanitizeValueStrategy('escaped');
        $translateProvider.useMissingTranslationHandlerLog();
    }]);


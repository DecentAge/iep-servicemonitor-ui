/******************************************************************************
 * Copyright © 2017 XIN Community                                             *
 *                                                                            *
 * See the DEVELOPER-AGREEMENT.txt and LICENSE.txt files at  the top-level    *
 * directory of this distribution for the individual copyright  holder        *
 * information and the developer policies on copyright and licensing.         *
 *                                                                            *
 * Unless otherwise agreed in a custom licensing agreement, no part of the    *
 * XIN software, including this file, may be copied, modified, propagated,    *
 * or distributed except according to the terms contained in the LICENSE.txt  *
 * file.                                                                      *
 *                                                                            *
 * Removal or modification of this copyright notice is prohibited.            *
 *                                                                            *
 ******************************************************************************/

angular.module('monitoring', ['peer']);

angular.module('monitoring')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('client', {
            abstract: true,
            url: '/',
            template: '<div ui-view></div>'
        });

        $urlRouterProvider.otherwise('/monitor');

        document.title = "Infinity Service Monitor | " + window.getEnvConfig("NETWORK_ENVIRONMENT");
    }]);

angular.module('monitoring').run(['baseConfig', '$rootScope', function (baseConfig, $rootScope) {
    $rootScope.MONITOR_OPTIONS = baseConfig;
}]);

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


angular.module('baseClient', ['restangular', 'ui.router', 'ui.bootstrap','datatables', 'datatables.bootstrap','cc.autorefresh']);

angular.module('baseClient').constant('baseConfig', {
    'AUTO_PAGE_REFRESH_INTERVAL': window.getEnvConfig('AUTO_PAGE_REFRESH_INTERVAL') || '300000',
    'RELEASE_VERSION': window.getEnvConfig('RELEASE_VERSION')
});

angular.module('baseClient').filter('isOnline', ['$sce', function ($sce) {
    return function (val) {
        switch (val) {
            case true:
                return '<small> <span class="glyphicon glyphicon-ok" style="color:green"></span> </small>';
            case false:
                return '<small> <span class="glyphicon glyphicon-remove" style="color:red"></span> </small>';
            default:
                return '<small> <span class="glyphicon glyphicon-remove" style="color:black"></span> </small>';
        }
    };
}]);

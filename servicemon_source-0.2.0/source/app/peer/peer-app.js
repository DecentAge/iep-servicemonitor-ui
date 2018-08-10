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

angular.module('peer', ['baseClient']);

angular.module('peer')
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $stateProvider.state('client.peers', {
            url: '^/monitor',
            templateUrl: './peer/views/monitor.html',
            controller: 'PeerStatusCtrl'
        });
    }]);

angular.module('peer').constant('peerEndpoints', [
    {'label': 'Peer #1', 'ip': '185.35.137.7'  , 'url': 'http://185.35.137.7:8888/api/nodes'},
    {'label': 'Peer #2', 'ip': '185.103.75.217', 'url': 'http://185.103.75.217:8888/api/nodes'},
    {'label': 'Peer #3', 'ip': '185.35.139.101', 'url': 'http://185.35.139.101:8888/api/nodes'},
    {'label': 'Peer #4', 'ip': '185.35.139.102', 'url': 'http://185.35.139.102:8888/api/nodes'},
    {'label': 'Peer #5', 'ip': '185.35.139.103', 'url': 'http://185.35.139.103:8888/api/nodes'},
    {'label': 'Peer #6', 'ip': '185.35.139.104', 'url': 'http://185.35.139.104:8888/api/nodes'},
    {'label': 'Peer #7', 'ip': '185.35.139.105', 'url': 'http://185.35.139.105:8888/api/nodes'},
    {'label': 'Peer #8', 'ip': '185.61.149.40' , 'url': 'http://46.244.20.41:8888/api/nodes'},
    {'label': 'Peer #9', 'ip': '185.35.138.136', 'url': 'http://208.95.1.177:8888/api/nodes'},
    {'label': 'Peer #10', 'ip': '185.35.138.136', 'url': 'http://199.127.137.169:8888/api/nodes'}
]);

angular.module('peer').constant('macapEndpoints', [
    {'label': 'MaCap', 'ip': '185.103.75.217', 'url': 'http://185.103.75.217:8892/api/v1/get'}
]);

angular.module('peer').constant('websiteEndpoints', [
    {'label': 'Peerexplorer', 'ip': '185.103.75.217', 'url': 'http://185.103.75.217/peer/images/logo_nav.png'},
    {'label': 'Blockexplorer', 'ip': '185.103.75.217', 'url': 'http://185.103.75.217/block/images/logo_nav.png'},
    {'label': 'Online Wallet #1', 'ip': '46.244.20.41', 'url': 'http://46.244.20.41/wallet/images/logo.png'},
    {'label': 'Online Wallet #1', 'ip': '185.35.137.7', 'url': 'http://185.35.137.7/wallet/images/logo.png'},
    {'label': 'Online Wallet #1', 'ip': '208.95.1.177', 'url': 'http://208.95.1.177/wallet/images/logo.png'}
]);

angular.module('peer').constant('testnetEndpoints', [
    {'label': 'Online Wallet', 'ip': '185.35.138.140', 'url': 'http://185.35.138.140/wallet/images/logo.png'},
    {'label': 'Peerexplorer', 'ip': '185.35.138.140', 'url': 'http://185.35.138.140/peer/images/logo_nav.png'},
    {'label': 'Blockexplorer', 'ip': '185.35.138.140', 'url': 'http://185.35.138.140/block/images/logo_nav.png'}
]);

angular.module('peer').constant('apiEndpoints', [
  {'label': 'API Node', 'ip': '199.127.137.169', 'url': 'http://199.127.137.169:9005/docs/images/favicon-16x16.png'},
  {'label': 'API Backends', 'ip': '199.127.137.169', 'url': 'http://199.127.137.169:9006/docs/images/favicon-16x16.png'}
]);

angular.module('peer').constant('peerConfig', {
    'apiUrl': 'api/nodes',
});

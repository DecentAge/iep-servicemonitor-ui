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

angular.module('peer').controller('PeerStatusCtrl',
    ['$scope', 'PeerService', 'peerEndpoints', 'macapEndpoints','websiteEndpoints', 'testnetEndpoints', 'apiEndpoints' , 'isOnlineFilter', '$sce',
        function ($scope, PeerService, peerEndpoints, macapEndpoints,websiteEndpoints, testnetEndpoints, apiEndpoints, isOnlineFilter, $sce) {

            $scope.peerEndpoints = peerEndpoints;
            $scope.macapEndpoints = macapEndpoints;
            $scope.websiteEndpoints = websiteEndpoints;
            $scope.testnetEndpoints = testnetEndpoints;
            $scope.apiEndpoints = apiEndpoints;

            $scope.trustAsHtml = $sce.trustAsHtml;

            $scope.IP_STATUS = {};

            $scope.getAllIpStatus = function (ipArray,website) {

                angular.forEach(ipArray, function (value, key) {
                    PeerService.getPeerStatus(value.url,website).then(function (success) {
                        //console.log(success);
                        $scope.IP_STATUS[value.url] = $scope.IP_STATUS[value.url] || {};
                        $scope.IP_STATUS[value.url].status = '<span class="icon-check2"></span>';
                        $scope.IP_STATUS[value.url].timestamp = new Date().toString();
                    }, function (error) {
                        //console.log(error);
                        $scope.IP_STATUS[value.url] = $scope.IP_STATUS[value] || {};
                        $scope.IP_STATUS[value.url].status = '<span class="label label-warning">OFFLINE</span>';
                        $scope.IP_STATUS[value.url].timestamp = new Date().toString();
                    });
                });
            };

            $scope.getStatus = function (check, website) {

                var url = check.url;
                $scope.IP_STATUS[url] = {};
                return PeerService.getPeerStatus(url,website).then(function (success) {
                    $scope.IP_STATUS[url] = $scope.IP_STATUS[url] || {};
                    $scope.IP_STATUS[url].status = '<span class="icon-check2"></span>';
                    $scope.IP_STATUS[url].timestamp = new Date().toString();
                }, function (error) {
                    $scope.IP_STATUS[url] = $scope.IP_STATUS[url] || {};
                    $scope.IP_STATUS[url].status = '<span class="label label-warning">OFFLINE</span>';
                    $scope.IP_STATUS[url].timestamp = new Date().toString();
                });
            };

        }]);

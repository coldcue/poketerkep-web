'use strict';

angular
    .module('angularApp')
    .factory('UserAgentService', UserAgentService);

/**
 * User agent service to mach navigator.userAgent
 */
/*@ngInject*/
function UserAgentService($window) {

    var userAgentService = {
        getUserAgent: getUserAgent,
        isMobile: isMobile,
        isIOS: isIOS,
        isAndroid: isAndroid,
        isMobileSafari: isMobileSafari
    };

    /**
     * Get userAgent
     */
    function getUserAgent() {
        return $window.navigator.userAgent;
    }

    /**
     * Detect if user is using mobile device
     */
    function isMobile() {
        var userAgent = userAgentService.getUserAgent();

        if(angular.isDefined(userAgent)) {
            return userAgent.match(/Android/i) !== null || userAgent.match(/webOS/i) !== null ||
                userAgent.match(/iPhone/i) !== null || userAgent.match(/iPad/i) !== null ||
                userAgent.match(/iPod/i) !== null || userAgent.match(/BlackBerry/i) !== null ||
                userAgent.match(/Windows Phone/i) !== null;
        }

        return false;
    }

    /**
     * Detect if user is using iOS device
     */
    function isIOS() {
        var userAgent = userAgentService.getUserAgent();

        if(angular.isDefined(userAgent)) {
            return userAgent.match(/iPhone/i) !== null || userAgent.match(/iPad/i) !== null ||
                userAgent.match(/iPod/i) !== null;
        }

        return false;
    }

    /**
     * Detect if user is using Android device
     */
    function isAndroid() {
        var userAgent = userAgentService.getUserAgent();

        if(angular.isDefined(userAgent)) {
            return userAgent.match(/Android/i) !== null;
        }

        return false;
    }

    /**
     * Detect if user is using mobile Safari browser
     */
    function isMobileSafari() {
        var userAgent = userAgentService.getUserAgent();

        if(angular.isDefined(userAgent)) {
            return (userAgent.match(/iPhone/i) !== null || userAgent.match(/iPad/i) !== null ||
                userAgent.match(/iPod/i) !== null) && userAgent.match(/WebKit/i) !== null &&
                userAgent.match(/CriOS/i) === null;
        }

        return false;
    }

    return userAgentService;

}

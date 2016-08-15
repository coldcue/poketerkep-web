'use strict';

describe('Unit: UserAgent - service', function () {

    // Global variables
    var UserAgentService, $window, originalWindow;

    // Include app
    beforeEach(angular.mock.module('angularApp'));

    // Include test related dependencies
    beforeEach(angular.mock.inject(function (_UserAgentService_, _$window_) {
        UserAgentService = _UserAgentService_;
        $window = _$window_;
        originalWindow = $window;
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(UserAgentService).toBeDefined();
    });

    it('should have getUserAgent method which returns correct user agent', function () {
        expect(UserAgentService.getUserAgent).toBeDefined();

        // iPhone user agent
        var userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, ' +
            'like Gecko) Version/9.0 Mobile/13E230 Safari/601.1';

        $window = originalWindow;
        angular.extend($window, {
            navigator: {
                userAgent: userAgent
            }
        });

        expect(UserAgentService.getUserAgent()).toEqual(userAgent);
    });

    it('should have working isMobile method which returns true if user agent is a mobile', function () {
        expect(UserAgentService.isMobile).toBeDefined();

        $window = originalWindow;
        angular.extend($window, {
            navigator: {
                userAgent: undefined
            }
        });

        expect(UserAgentService.isMobile()).toBe(false);

        // iPhone user agent
        var userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, ' +
            'like Gecko) Version/9.0 Mobile/13E230 Safari/601.1';

        $window = originalWindow;
        angular.extend($window, {
            navigator: {
                userAgent: userAgent
            }
        });

        expect(UserAgentService.isMobile()).toBe(true);

        // Mac user agent
        userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) ' +
            'Chrome/51.0.2704.103 Safari/537.36';

        $window = originalWindow;
        angular.extend($window, {
            navigator: {
                userAgent: userAgent
            }
        });

        expect(UserAgentService.isMobile()).toBe(false);
    });

    it('should have working isIOS method which returns true if user agent is an iOS device', function () {
        expect(UserAgentService.isIOS).toBeDefined();

        $window = originalWindow;
        angular.extend($window, {
            navigator: {
                userAgent: undefined
            }
        });

        expect(UserAgentService.isIOS()).toBe(false);

        // iPhone user agent
        var userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, ' +
            'like Gecko) Version/9.0 Mobile/13E230 Safari/601.1';

        $window = originalWindow;
        angular.extend($window, {
            navigator: {
                userAgent: userAgent
            }
        });

        expect(UserAgentService.isIOS()).toBe(true);

        // Mac user agent
        userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) ' +
            'Chrome/51.0.2704.103 Safari/537.36';

        $window = originalWindow;
        angular.extend($window, {
            navigator: {
                userAgent: userAgent
            }
        });

        expect(UserAgentService.isIOS()).toBe(false);
    });

    it('should have working isAndroid method which returns true if user agent is an Android device', function () {
        expect(UserAgentService.isAndroid).toBeDefined();

        $window = originalWindow;
        angular.extend($window, {
            navigator: {
                userAgent: undefined
            }
        });

        expect(UserAgentService.isAndroid()).toBe(false);

        // Android user agent
        var userAgent = 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, ' +
            'like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36';

        $window = originalWindow;
        angular.extend($window, {
            navigator: {
                userAgent: userAgent
            }
        });

        expect(UserAgentService.isAndroid()).toBe(true);

        // Mac user agent
        userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) ' +
            'Chrome/51.0.2704.103 Safari/537.36';

        $window = originalWindow;
        angular.extend($window, {
            navigator: {
                userAgent: userAgent
            }
        });

        expect(UserAgentService.isAndroid()).toBe(false);
    });

    it('should have working isMobileSafari method which returns true if user agent is an iOS with Safari', function () {
        expect(UserAgentService.isMobileSafari).toBeDefined();

        $window = originalWindow;
        angular.extend($window, {
            navigator: {
                userAgent: undefined
            }
        });

        expect(UserAgentService.isMobileSafari()).toBe(false);

        // iPod Safari user agent
        var userAgent = 'Mozilla/5.0 (iPod; U; CPU like Mac OS X; en) AppleWebKit/420.1 (KHTML, like Gecko) ' +
            'Version/3.0 Mobile/3A101a Safari/419.3';

        $window = originalWindow;
        angular.extend($window, {
            navigator: {
                userAgent: userAgent
            }
        });

        expect(UserAgentService.isMobileSafari()).toBe(true);

        // iPhone Chrome user agent
        userAgent = 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 5_1_1 like Mac OS X; en) AppleWebKit/534.46.0 (KHTML, ' +
            'like Gecko) CriOS/19.0.1084.60 Mobile/9B206 Safari/7534.48.3';

        $window = originalWindow;
        angular.extend($window, {
            navigator: {
                userAgent: userAgent
            }
        });

        expect(UserAgentService.isMobileSafari()).toBe(false);
    });

});

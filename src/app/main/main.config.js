'use strict';

angular
    .module('angularApp')
    .config(MainConfig);

/**
 * Main module configurations
 */
/*@ngInject*/
function MainConfig($urlRouterProvider, $httpProvider, $logProvider, ENV, uiGmapGoogleMapApiProvider,
                    httpRequestInterceptorCacheBusterProvider, AnalyticsProvider, FacebookProvider) {

    // Setup cache buster for api calls
    httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*api.*/], true);

    // Define the main URL path
    $urlRouterProvider.otherwise('/map');

    // Enable interceptors
    $httpProvider.interceptors.push('LoaderInterceptor');

    // Disable logging in production mode
    $logProvider.debugEnabled(!ENV.production);

    // Angular google maps configure
    uiGmapGoogleMapApiProvider.configure({
        key: ENV.google.apiKey,
        v: '3.24',
        language: 'hu-HU',
        libraries: 'geometry,visualization'
    });

    // Google Analytics configure
    AnalyticsProvider.setAccount(ENV.google.analyticsId);

    // Facebook configure
    FacebookProvider.init(ENV.facebook.appId);

}

'use strict';

angular
    .module('angularApp')
    .config(MainConfig);

/**
 * Main module configurations
 */
/*@ngInject*/
function MainConfig($urlRouterProvider, $httpProvider, $logProvider, ENV, uiGmapGoogleMapApiProvider,
                    httpRequestInterceptorCacheBusterProvider) {

    // Setup cache buster for api calls
    httpRequestInterceptorCacheBusterProvider.setMatchlist([/.*api.*/], true);

    // Define the main URL path
    $urlRouterProvider.otherwise('/homepage');

    // Enable interceptors
    $httpProvider.interceptors.push('LoaderInterceptor');

    // Disable logging in production mode
    $logProvider.debugEnabled(!ENV.production);

    // Angular google maps configure
    uiGmapGoogleMapApiProvider.configure({
        key: ENV.googleAPIKey,
        v: '3.23',
        language: 'en-US',
        libraries: 'geometry,visualization'
    });

}

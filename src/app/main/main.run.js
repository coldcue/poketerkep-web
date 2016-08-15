'use strict';

angular
    .module('angularApp')
    .run(MainRun);

/**
 * This function runs when the app starts
 */
/*@ngInject*/
function MainRun($rootScope, $state, $locale, ENV, MockService, amMoment, LoaderInterceptor, Analytics) {

    // Event listener - before state change
    $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
        $rootScope.toState = toState;
        $rootScope.toStateParams = toStateParams;
    });

    // Event listener - after state changed
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toStateParams, fromState, fromStateParams) {
        $rootScope.previousStateName = fromState.name;
        $rootScope.previousStateParams = fromStateParams;
    });

    // Function to handle app back button states
    $rootScope.back = function () {
        if ($state.get($rootScope.previousStateName) === null) {
            $state.go('map');
        } else {
            $state.go($rootScope.previousStateName, $rootScope.previousStateParams);
        }
    };

    // Bind configuration values to main scope
    $rootScope.ENV = ENV;

    // Mock backend endpoints
    MockService.passThrough();

    // Angular moment locale set
    amMoment.changeLocale('hu');

    // Set group separator to space
    $locale.NUMBER_FORMATS.GROUP_SEP = ' ';

    // Ignore endpoints in loader interceptor
    LoaderInterceptor.addIgnoredEndpoint('facebook.com');
    LoaderInterceptor.addIgnoredEndpoint('googleapis.com');
    LoaderInterceptor.addIgnoredEndpoint(ENV.apiEndpoint + 'game');

    // Send a page view request to analytics
    Analytics.pageView();

}

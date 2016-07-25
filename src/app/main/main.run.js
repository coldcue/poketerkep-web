'use strict';

angular
    .module('angularApp')
    .run(MainInit);

/**
 * This function runs when the app starts
 */
/*@ngInject*/
function MainInit($rootScope, $state, ENV, MockService, amMoment) {

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
            $state.go('homepage');
        } else {
            $state.go($rootScope.previousStateName, $rootScope.previousStateParams);
        }
    };

    // Bind configuration values to main scope
    $rootScope.ENV = ENV;

    // Mock backend endpoints
    MockService.init();

    // Angular moment locale set
    amMoment.changeLocale('hu');

}

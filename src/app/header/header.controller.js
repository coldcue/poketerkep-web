'use strict';

angular
    .module('angularApp')
    .controller('HeaderController', HeaderController);

/**
 * Controller for header
 */
/*@ngInject*/
function HeaderController(Analytics) {

    // controllerAs with vm
    var vm = this;

    // ViewModel bindings
    vm.menuClick = menuClick;
    vm.betaClick = betaClick;

    /**
     * Trigger when user clicks on menu
     */
    function menuClick() {
        Analytics.trackEvent('Header', 'menuClick');
    }

    /**
     * Trigger when user clicks on beta flag
     */
    function betaClick() {
        Analytics.trackEvent('Header', 'betaClick');
    }

}

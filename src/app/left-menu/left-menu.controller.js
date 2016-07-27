'use strict';

angular
    .module('angularApp')
    .controller('LeftMenuController', LeftMenuController);

/**
 * Controller for left menu
 */
/*@ngInject*/
function LeftMenuController() {

    // controllerAs with vm
    var vm = this;

    vm.showPokemons = true;
    vm.filterStatus = true;

}

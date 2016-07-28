'use strict';

angular
    .module('angularApp')
    .controller('LeftMenuController', LeftMenuController);

/**
 * Controller for left menu
 */
/*@ngInject*/
function LeftMenuController(GameDTO, $rootScope) {

    // controllerAs with vm
    var vm = this;

    // ViewModel bindings
    vm.setFilters = setFilters;

    /**
     * Constructor, initialize
     */
    function init() {
        vm.filterStates = GameDTO.filterStates;
        vm.selectedPokemons = GameDTO.selectedPokemons;
    }

    init();

    /**
     * Set game filters in GameDTO
     */
    function setFilters() {
        GameDTO.filterStates = vm.filterStates;
        GameDTO.selectedPokemons = vm.selectedPokemons;
        $rootScope.$broadcast('updateGameData');
    }

}

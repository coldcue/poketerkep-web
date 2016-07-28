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
        vm.filterStates = GameDTO.getFilterStates();
        vm.selectedPokemons = GameDTO.getSelectedPokemons();
    }

    init();

    /**
     * Set game filters in GameDTO
     */
    function setFilters() {
        GameDTO.setFilterStates(vm.filterStates);
        GameDTO.setSelectedPokemons(vm.selectedPokemons);
        $rootScope.$broadcast('updateGameData');
    }

}

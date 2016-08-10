'use strict';

angular
    .module('angularApp')
    .controller('LeftMenuController', LeftMenuController);

/**
 * Controller for left menu
 */
/*@ngInject*/
function LeftMenuController(GameDTO, $rootScope, $window, $timeout) {

    // controllerAs with vm
    var vm = this;

    // ViewModel bindings
    vm.facebookInit = facebookInit;
    vm.setFilters = setFilters;

    /**
     * Constructor, initialize
     */
    function init() {
        vm.filterStates = GameDTO.getFilterStates();
        vm.selectedPokemons = GameDTO.getSelectedPokemons();
        vm.facebookInit();
    }

    init();

    /**
     * Facebook reload when left menu appears
     */
    function facebookInit() {
        if(!angular.isUndefinedOrNull($window.FB)) {
            $timeout($window.FB.XFBML.parse, 0);
        }
    }

    /**
     * Set game filters in GameDTO
     */
    function setFilters() {
        GameDTO.setFilterStates(vm.filterStates);
        GameDTO.setSelectedPokemons(vm.selectedPokemons);
        $rootScope.$broadcast('updateGameData');
    }

}

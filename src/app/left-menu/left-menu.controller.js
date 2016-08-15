'use strict';

angular
    .module('angularApp')
    .controller('LeftMenuController', LeftMenuController);

/**
 * Controller for left menu
 */
/*@ngInject*/
function LeftMenuController(GameDTO, $rootScope, $window, $timeout, Analytics) {

    // controllerAs with vm
    var vm = this;

    // ViewModel bindings
    vm.facebookInit = facebookInit;
    vm.changeFilters = changeFilters;
    vm.changeSelectedPokemons = changeSelectedPokemons;

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
    function changeFilters() {
        GameDTO.setFilterStates(vm.filterStates);
        $rootScope.$broadcast('updateGameData');
        Analytics.trackEvent('Game', 'changeFilters', JSON.stringify(vm.filterStates));
    }

    /**
     * Set game selected pokemons in GameDTO
     */
    function changeSelectedPokemons() {
        GameDTO.setSelectedPokemons(vm.selectedPokemons);
        $rootScope.$broadcast('updateGameData');
        Analytics.trackEvent('Game', 'changeSelectedPokemons', JSON.stringify(GameDTO.getSelectedPokemonIds()));
    }

}

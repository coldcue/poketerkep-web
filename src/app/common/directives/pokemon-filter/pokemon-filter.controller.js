'use strict';

angular
    .module('angularApp')
    .controller('PokemonFilterController', PokemonFilterController);

/**
 * Controller for pokemon filter
 */
/*@ngInject*/
function PokemonFilterController(POKEMONS, Utils, $scope) {

    // controllerAs with vm
    var vm = this;

    // Global functions
    vm.searchPokemons = searchPokemons;
    vm.pokemonsSelected = pokemonsSelected;

    /**
     * Constructor, initialize
     */
    function init() {
        if (angular.isDefined($scope.ngModel) && $scope.ngModel.length !== 0) {
            vm.selectedObjects = angular.copy($scope.ngModel);
        }

        $scope.$watch('vm.selectedObjects', vm.pokemonsSelected, true);
    }
    init();

    /**
     * Get game data from backend
     * @param term - Search term
     */
    function searchPokemons(term) {
        if(angular.isUndefinedOrNull(term) || term.length === 0) {
            return POKEMONS.sort(Utils.sortPokemons);
        }

        var filteredArray = [];

        angular.forEach(POKEMONS, function(pokemon) {
            if(pokemon.name.toLowerCase().indexOf(term.toLowerCase()) === 0) {
                filteredArray.push(pokemon);
            }
        });

        return filteredArray.sort(Utils.sortPokemons);
    }

    /**
     * If the selected pokemon list changes
     * @param newValue - New value of selected pokemons
     */
    function pokemonsSelected(newValue) {
        if(!angular.isUndefinedOrNull(newValue)) {
            vm.updateModel(newValue);
        }
    }

}

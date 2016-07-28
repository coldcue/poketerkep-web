'use strict';

angular
    .module('angularApp')
    .controller('PokemonFilterController', PokemonFilterController);

/**
 * Controller for pokemon filter
 */
/*@ngInject*/
function PokemonFilterController(POKEMONS, $scope) {

    // controllerAs with vm
    var vm = this;

    // Global functions
    vm.searchPokemons = searchPokemons;

    /**
     * Constructor, initialize
     */
    function init() {
        if (angular.isDefined($scope.ngModel) && $scope.ngModel.length !== 0) {
            vm.selectedObjects = $scope.ngModel;
        }

        $scope.$watch('vm.selectedObjects', pokemonsSelected, true);
    }
    init();

    /**
     * Get game data from backend
     * @param term - Search term
     */
    function searchPokemons(term) {
        if(term.length === 0) {
            return POKEMONS.sort(sortPokemons);
        }

        var filteredArray = [];

        angular.forEach(POKEMONS, function(pokemon) {
            if(pokemon.name.toLowerCase().indexOf(term.toLowerCase()) === 0) {
                filteredArray.push(pokemon);
            }
        });

        return filteredArray.sort(sortPokemons);
    }

    /**
     * Sort by pokemon name
     * @param a - First comparable object
     * @param b - Second comparable object
     */
    function sortPokemons(a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }

    /**
     * If the selected pokemon list changes
     * @param newValue - New value of selected pokemons
     */
    function pokemonsSelected(newValue) {
        if(!angular.isUndefinedOrNull(newValue)) {
           if (vm.selectedObjects !== $scope.ngModel) {
               vm.updateModel(newValue);
           }
        }
    }

}

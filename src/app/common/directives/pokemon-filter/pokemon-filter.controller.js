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
        if (angular.isDefined($scope.ngModel)) {
            vm.selectedPokemons = $scope.ngModel;
        }

        $scope.$watch('vm.selectedPokemons', pokemonsSelected);
    }
    init();

    /**
     * Get game data from backend
     */
    function searchPokemons(term) {
        if(term.length === 0) {
            return POKEMONS.sort();
        }

        var filteredArray = [];

        angular.forEach(POKEMONS, function(pokemon) {
            if(pokemon.toLowerCase().indexOf(term.toLowerCase()) === 0) {
                filteredArray.push(pokemon);
            }
        });

        return filteredArray.sort();
    }

    /**
     * If the selected pokemon list changes
     * @param newValue - new value of selected pokemons
     */
    function pokemonsSelected(newValue) {
        if (vm.selectedPokemons !== $scope.ngModel) {
            vm.updateModel(newValue);
        }
    }

}

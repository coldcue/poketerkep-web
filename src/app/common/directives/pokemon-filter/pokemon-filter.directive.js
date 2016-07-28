'use strict';

angular
    .module('angularApp')
    .directive('pokemonFilter', pokemonFilter);

/**
 * Directive for filtering pokemons
 */
function pokemonFilter() {
    var name = 'pokemon-filter';

    return {
        templateUrl: 'views/' + name + '.tpl.html',
        restrict: 'E',
        controller: 'PokemonFilterController',
        controllerAs: 'vm',
        scope: {
            ngModel: '=',
            ngChange: '&'
        },
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            scope.vm.updateModel = function (items) {
                if(items.length > 0 && !angular.isUndefinedOrNull(items[0])) { // bug fix...
                    ngModelCtrl.$setViewValue(angular.copy(items));
                } else {
                    ngModelCtrl.$setViewValue([]);
                }
            };
        }
    };
}

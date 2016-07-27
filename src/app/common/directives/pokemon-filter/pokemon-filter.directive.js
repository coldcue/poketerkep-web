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
            // ngChange for custom directive -
            // http://stackoverflow.com/questions/24754005/how-to-implement-an-ng-change-for-a-custom-directive

            scope.vm.updateModel = function (item) {
                ngModelCtrl.$setViewValue(item);
            };

            ngModelCtrl.$viewChangeListeners.push(function () {
                scope.$eval(attrs.ngChange);
            });

        }
    };
}

'use strict';

describe('Unit: PokemonFilter - controller', function () {

    // Global variables
    var PokemonFilterController, PokemonFilterController2, POKEMONS, Utils, $scope;

    // Include app
    beforeEach(angular.mock.module('angularApp'));

    // Include test related dependencies
    beforeEach(angular.mock.inject(function(_$controller_, _POKEMONS_, _Utils_, _$rootScope_) {
        POKEMONS = _POKEMONS_;
        Utils = _Utils_;
        $scope = _$rootScope_.$new();

        spyOn($scope, '$watch');

        PokemonFilterController = _$controller_('PokemonFilterController', {
            $scope: $scope
        });

        PokemonFilterController.updateModel = function() {};

        $scope.ngModel = POKEMONS[0];

        PokemonFilterController2 = _$controller_('PokemonFilterController', {
            $scope: $scope
        });
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(PokemonFilterController).toBeDefined();
    });

    it('should have init method which handles selectedObjects viewModel depends on ngModel', function () {
        expect(PokemonFilterController.selectedObjects).not.toBeDefined();
        expect(PokemonFilterController2.selectedObjects).toBeDefined();

        PokemonFilterController.selectedObjects = ['test'];
        expect($scope.$watch).toHaveBeenCalled();
    });

    it('should have searchPokemons method which returns a filtered pokemon array by search term', function () {
        expect(PokemonFilterController.searchPokemons).toBeDefined();

        var pokemons = PokemonFilterController.searchPokemons();
        expect(pokemons.length).toEqual(POKEMONS.length);
        expect(pokemons).toEqual(POKEMONS.sort(Utils.compareByName));

        pokemons = PokemonFilterController.searchPokemons('Pikachu');
        expect(pokemons.length).toEqual(1);

        pokemons = PokemonFilterController.searchPokemons('pikachu');
        expect(pokemons.length).toEqual(1);

        pokemons = PokemonFilterController.searchPokemons('C');
        expect(pokemons.length).toEqual(9);
    });

    it('should have pokemonsSelected method which updates ngModel', function () {
        expect(PokemonFilterController.pokemonsSelected).toBeDefined();

        spyOn(PokemonFilterController, 'updateModel');

        PokemonFilterController.pokemonsSelected();
        expect(PokemonFilterController.updateModel).not.toHaveBeenCalled();

        PokemonFilterController.pokemonsSelected(POKEMONS[0]);
        expect(PokemonFilterController.updateModel).toHaveBeenCalled();
    });

});

'use strict';

describe('Unit: LeftMenu - controller', function () {

    // Global variables
    var LeftMenuController, GameDTO, $rootScope;

    // Include app
    beforeEach(angular.mock.module('angularApp'));

    // Include test related dependencies
    beforeEach(angular.mock.inject(function(_$controller_, _GameDTO_, _$rootScope_) {
        GameDTO = _GameDTO_;
        $rootScope = _$rootScope_;

        LeftMenuController = _$controller_('LeftMenuController');
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(LeftMenuController).toBeDefined();
    });

    it('should have init method which automatically initializes controller', function () {
        expect(LeftMenuController.filterStates).toBeDefined();
        expect(LeftMenuController.selectedPokemons).toBeDefined();
    });

    it('should have setFilters method which modifies GameDTO filterStates and updates game data', function () {
        expect(LeftMenuController.setFilters).toBeDefined();

        spyOn(GameDTO, 'setFilterStates');
        spyOn(GameDTO, 'setSelectedPokemons');
        spyOn($rootScope, '$broadcast');

        LeftMenuController.setFilters();

        expect(GameDTO.setFilterStates).toHaveBeenCalledWith(LeftMenuController.filterStates);
        expect(GameDTO.setSelectedPokemons).toHaveBeenCalledWith(LeftMenuController.selectedPokemons);
        expect($rootScope.$broadcast).toHaveBeenCalledWith('updateGameData');
    });

});
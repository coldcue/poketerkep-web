'use strict';

describe('Unit: MapController - controller', function () {

    // Global variables
    var MapController, GameDTO, GameDataService, $rootScope, $httpBackend;

    // Include app
    beforeEach(angular.mock.module('angularApp'));

    // Mock DataServices
    beforeEach(function() {
        module(function($provide) {
            $provide.factory('GameDataService', function($q) {
                var get = jasmine.createSpy('get').and.callFake(function() {
                    return $q.when({});
                });

                return {
                    get: get
                };
            });
        });
    });

    // Include test related dependencies
    beforeEach(angular.mock.inject(function(_$controller_, _GameDTO_, _GameDataService_, _$rootScope_, _$httpBackend_) {
        GameDTO = _GameDTO_;
        GameDataService = _GameDataService_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;

        spyOn($rootScope, '$on');

        MapController = _$controller_('MapController', {
            $rootScope: $rootScope
        });
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(MapController).toBeDefined();
    });

    it('should have init method which automatically initializes controller', function () {
        expect(MapController.map).toBeDefined();
        expect(MapController.playerPosition).toBeDefined();

        $rootScope.$broadcast('updateGameData');

        expect($rootScope.$on).toHaveBeenCalled();
    });

    it('should have working getGameData method to load game data from backend', function () {
        expect(MapController.getGameData).toBeDefined();

        $httpBackend.expectGET(/game/).respond(200, {});

        MapController.getGameData();

        expect(GameDataService.get).toHaveBeenCalled();
    });

    it('should have working setMapData method to set viewModel map variables', function () {
        expect(MapController.setMapData).toBeDefined();

        var fakeFilteredGame = {
            gyms: 'test',
            pokemons: 'test',
            pokestops: 'test'
        };

        spyOn(GameDTO, 'getFilteredGame').and.callFake(function() {
            return fakeFilteredGame;
        });

        MapController.setMapData();

        expect(GameDTO.getFilteredGame).toHaveBeenCalled();
        expect(MapController.gyms).toEqual(fakeFilteredGame.gyms);
        expect(MapController.pokemons).toEqual(fakeFilteredGame.pokemons);
        expect(MapController.pokestops).toEqual(fakeFilteredGame.pokestops);
    });

});

'use strict';

describe('Unit: GameDTO - service', function () {

    // Global variables
    var GameDTO, GameUtilsService, StorageService;

    // Mock filterStates
    var mockFilterStates = {
        pokemons: true,
        gyms: true,
        pokestops: true,
        showOrHide: true
    };

    // Mock selectedPokemons
    var mockSelectedPokemons = [
        {id: 41, name: 'Zubat'},
        {id: 133, name: 'Eevee'}
    ];

    // Mock StorageService
    var mockStorageService = {
        get: function (key, validData) {
            if (key === 'filterStates') {
                return (validData ? mockFilterStates : null);
            } else if (key === 'selectedPokemons') {
                return (validData ? mockSelectedPokemons : null);
            }
        }
    };

    // Include app
    beforeEach(angular.mock.module('angularApp'));

    // Include test related dependencies
    beforeEach(angular.mock.inject(function (_GameDTO_, _GameUtilsService_, _StorageService_) {
        GameDTO = _GameDTO_;
        GameUtilsService = _GameUtilsService_;
        StorageService = _StorageService_;
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(GameDTO).toBeDefined();
    });

    it('should have init method be defined', function () {
        expect(GameDTO.init).toBeDefined();
    });

    it('should have init method which not initializes variables if localStorage is empty', function () {
        var initialFilterStates = {
            pokemons: true,
            gyms: false,
            pokestops: false,
            showOrHide: true
        };

        var initialSelectedPokemons = [];

        expect(GameDTO.getFilterStates()).toEqual(initialFilterStates);
        expect(GameDTO.getSelectedPokemons()).toEqual(initialSelectedPokemons);

        spyOn(StorageService, 'get').and.callFake(function (key) {
            return mockStorageService.get(key, false);
        });

        GameDTO.init();
        expect(GameDTO.getFilterStates()).toEqual(initialFilterStates);
        expect(GameDTO.getSelectedPokemons()).toEqual(initialSelectedPokemons);
    });

    it('should have init method which initializes variables if localStorage has correct values', function () {
        spyOn(StorageService, 'get').and.callFake(function (key) {
            return mockStorageService.get(key, true);
        });

        GameDTO.init();
        expect(GameDTO.getFilterStates()).toEqual(mockFilterStates);
        expect(GameDTO.getSelectedPokemons()).toEqual(mockSelectedPokemons);
    });

    it('should have working getter/setter methods for game object', function () {
        expect(GameDTO.getGame).toBeDefined();
        expect(GameDTO.setGame).toBeDefined();

        var fakeGame = 'fakeGame';
        GameDTO.setGame(fakeGame);

        expect(GameDTO.getGame()).toEqual(fakeGame);
    });

    it('should have setRAWGame method which sets different game object', function () {
        expect(GameDTO.setRAWGame).toBeDefined();

        var fakeRAWGame = {
            gyms: [{
                'gym_id': 'e2b04674351844caa978eb2fffb0c364.16',
                'gym_points': 9198,
                'latitude': 47.441185,
                'longitude': 19.03969,
                'team_id': 2
            }],
            pokemons: [{
                'disappear_time': 1469440103532,
                'encounter_id': 'MTcxMzQyMDUzNjgxNzI5MjkxNDk=',
                'latitude': 47.4263831387732,
                'longitude': 19.040191820673552,
                'pokemon_id': 133,
                'pokemon_name': 'Eevee'
            }],
            pokestops: [{
                'latitude': 47.44382,
                'longitude': 19.037155,
                'lure_expiration': null,
                'pokestop_id': 'a35627e5105f4e84b6ca1b72a2c7630f.16'
            }]
        };

        spyOn(GameUtilsService, 'convertGymsData');
        spyOn(GameUtilsService, 'convertPokemonsData');
        spyOn(GameUtilsService, 'convertPokestopsData');

        GameDTO.setRAWGame(fakeRAWGame);

        expect(GameUtilsService.convertGymsData).toHaveBeenCalled();
        expect(GameUtilsService.convertPokemonsData).toHaveBeenCalled();
        expect(GameUtilsService.convertPokestopsData).toHaveBeenCalled();
        expect(GameDTO.getGame()).not.toEqual(fakeRAWGame);
    });

    it('should have working getter/setter methods for filterStates object', function () {
        expect(GameDTO.getFilterStates).toBeDefined();
        expect(GameDTO.setFilterStates).toBeDefined();

        spyOn(StorageService, 'set');

        var fakeFilterStates = 'fakeFilterStates';
        GameDTO.setFilterStates(fakeFilterStates);

        expect(StorageService.set).toHaveBeenCalled();
        expect(GameDTO.getFilterStates()).toEqual(fakeFilterStates);
    });

    it('should have working getter/setter methods for selectedPokemons object', function () {
        expect(GameDTO.getSelectedPokemons).toBeDefined();
        expect(GameDTO.setSelectedPokemons).toBeDefined();

        spyOn(StorageService, 'set');

        var fakeSelectedPokemons = 'fakeSelectedPokemons';
        GameDTO.setSelectedPokemons(fakeSelectedPokemons);

        expect(StorageService.set).toHaveBeenCalled();
        expect(GameDTO.getSelectedPokemons()).toEqual(fakeSelectedPokemons);
    });

});

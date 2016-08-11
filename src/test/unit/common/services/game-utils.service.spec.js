'use strict';

describe('Unit: GameUtils - service', function () {

    // Global variables
    var GameUtilsService, ENV, GAME_ITEM_TYPES, GAME_TEAM_TYPES, POKEMONS;

    // Mock RAW game data
    var mockRAWData = {
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
            'pokemon_id': 133
        }],
        pokestops: [{
            'latitude': 47.44382,
            'longitude': 19.037155,
            'lure_expiration': null,
            'pokestop_id': 'a35627e5105f4e84b6ca1b72a2c7630f.16'
        }]
    };

    // Include app
    beforeEach(angular.mock.module('angularApp'));

    // Include test related dependencies
    beforeEach(angular.mock.inject(function (_GameUtilsService_, _ENV_, _GAME_ITEM_TYPES_, _GAME_TEAM_TYPES_,
                                             _POKEMONS_) {
        GameUtilsService = _GameUtilsService_;
        ENV = _ENV_;
        GAME_ITEM_TYPES = _GAME_ITEM_TYPES_;
        GAME_TEAM_TYPES = _GAME_TEAM_TYPES_;
        POKEMONS = _POKEMONS_;
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(GameUtilsService).toBeDefined();
    });

    it('should have working convertGymsData method', function () {
        expect(GameUtilsService.convertGymsData).toBeDefined();

        var gyms = GameUtilsService.convertGymsData(mockRAWData.gyms);

        expect(gyms.length).toEqual(1);
        expect(gyms[0].type).toEqual(GAME_ITEM_TYPES.gym);
        expect(gyms[0].id).toEqual(mockRAWData.gyms[0]['gym_id']);
        expect(gyms[0].coords).toEqual({
            latitude: mockRAWData.gyms[0]['latitude'],
            longitude: mockRAWData.gyms[0]['longitude']
        });
        expect(gyms[0].icon.url).toBeDefined();
        expect(gyms[0].icon.scaledSize).toBeDefined();
        expect(gyms[0].data).toBeDefined();
    });

    it('should have working convertPokemonsData method', function () {
        expect(GameUtilsService.convertPokemonsData).toBeDefined();

        var pokemons = GameUtilsService.convertPokemonsData(mockRAWData.pokemons);

        expect(pokemons.length).toEqual(1);
        expect(pokemons[0].type).toEqual(GAME_ITEM_TYPES.pokemon);
        expect(pokemons[0].id).toEqual(mockRAWData.pokemons[0]['encounter_id']);
        expect(pokemons[0].coords).toEqual({
            latitude: mockRAWData.pokemons[0]['latitude'],
            longitude: mockRAWData.pokemons[0]['longitude']
        });
        expect(pokemons[0].icon.url).toBeDefined();
        expect(pokemons[0].icon.scaledSize).toBeDefined();
        expect(pokemons[0].data).toBeDefined();
    });

    it('should have working convertPokestopsData method', function () {
        expect(GameUtilsService.convertPokestopsData).toBeDefined();

        var pokestops = GameUtilsService.convertPokestopsData(mockRAWData.pokestops);

        expect(pokestops.length).toEqual(1);
        expect(pokestops[0].type).toEqual(GAME_ITEM_TYPES.pokestop);
        expect(pokestops[0].id).toEqual(mockRAWData.pokestops[0]['pokestop_id']);
        expect(pokestops[0].coords).toEqual({
            latitude: mockRAWData.pokestops[0]['latitude'],
            longitude: mockRAWData.pokestops[0]['longitude']
        });
        expect(pokestops[0].icon.url).toBeDefined();
        expect(pokestops[0].icon.scaledSize).toBeDefined();
        expect(pokestops[0].data).toBeDefined();
    });

    it('should have working getTeamData method', function () {
        expect(GameUtilsService.getTeamData).toBeDefined();

        var team1 = GameUtilsService.getTeamData(1);

        expect(team1.data.id).toEqual(GAME_TEAM_TYPES.instinct.id);
        expect(team1.data.name).toEqual(GAME_TEAM_TYPES.instinct.name);
        expect(team1.icon).toEqual(ENV.imagePaths.default + GAME_TEAM_TYPES.instinct.icon);

        var team2 = GameUtilsService.getTeamData(2);

        expect(team2.data.id).toEqual(GAME_TEAM_TYPES.mystic.id);
        expect(team2.data.name).toEqual(GAME_TEAM_TYPES.mystic.name);
        expect(team2.icon).toEqual(ENV.imagePaths.default + GAME_TEAM_TYPES.mystic.icon);

        var team3 = GameUtilsService.getTeamData(3);

        expect(team3.data.id).toEqual(GAME_TEAM_TYPES.valor.id);
        expect(team3.data.name).toEqual(GAME_TEAM_TYPES.valor.name);
        expect(team3.icon).toEqual(ENV.imagePaths.default + GAME_TEAM_TYPES.valor.icon);

        var teamDefault = GameUtilsService.getTeamData('test');

        expect(teamDefault.data.id).toEqual(GAME_TEAM_TYPES.uncontested.id);
        expect(teamDefault.data.name).toEqual(GAME_TEAM_TYPES.uncontested.name);
        expect(teamDefault.icon).toEqual(ENV.imagePaths.default + GAME_TEAM_TYPES.uncontested.icon);
    });

    it('should have working getPokestopIcon method', function () {
        expect(GameUtilsService.getPokestopIcon).toBeDefined();

        var pokestopIcon = GameUtilsService.getPokestopIcon(null);

        expect(pokestopIcon).toEqual(ENV.imagePaths.default + 'pokestop.png');

        var lurePokestopIcon = GameUtilsService.getPokestopIcon(true);

        expect(lurePokestopIcon).toEqual(ENV.imagePaths.default + 'pokestop_lure.png');
    });

    it('should have working getPokemonName method which returns pokemon name by id', function () {
        expect(GameUtilsService.getPokemonName).toBeDefined();

        var pokemonName = GameUtilsService.getPokemonName(5);

        expect(pokemonName).toEqual('Charmeleon');

        pokemonName = GameUtilsService.getPokemonName(300);

        expect(pokemonName).toEqual('');
    });

});

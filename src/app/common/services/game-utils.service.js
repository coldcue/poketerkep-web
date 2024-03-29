'use strict';

angular
    .module('angularApp')
    .factory('GameUtilsService', GameUtilsService);

/**
 * Game utils service to handle game data
 */
/*@ngInject*/
function GameUtilsService(ENV, GAME_ITEM_TYPES, GAME_TEAM_TYPES, POKEMONS) {

    var gameUtilsService = {
        convertGymsData: convertGymsData,
        convertPokemonsData: convertPokemonsData,
        convertPokestopsData: convertPokestopsData,
        getTeamData: getTeamData,
        getPokestopIcon: getPokestopIcon,
        getPokemonName: getPokemonName
    };

    /**
     * Convert gyms data
     * @param rawData - Raw gyms data what came from API
     */
    function convertGymsData(rawData) {
        var gyms = [];

        angular.forEach(rawData, function(data) {
            var teamData = gameUtilsService.getTeamData(data['team_id']);

            var gym = {
                type: GAME_ITEM_TYPES.gym,
                id: data['gym_id'],
                coords: {
                    latitude: data['latitude'],
                    longitude: data['longitude']
                },
                icon: {
                    url: teamData.icon,
                    scaledSize: { width: 25, height: 25 }
                },
                data: data
            };

            gym.data['team_info'] = teamData.data;

            gyms.push(gym);
        });

        return gyms;
    }

    /**
     * Convert pokemons data
     * @param rawData - Raw pokemons data what came from API
     */
    function convertPokemonsData(rawData) {
        var pokemons = [];

        angular.forEach(rawData, function(data) {
            var pokemon = {
                type: GAME_ITEM_TYPES.pokemon,
                id: data['encounter_id'],
                coords: {
                    latitude: data['latitude'],
                    longitude: data['longitude']
                },
                icon: {
                    url: ENV.imagePaths.pokemons + data['pokemon_id'] + '.png',
                    scaledSize: { width: 25, height: 25 }
                },
                data: data
            };

            pokemons.push(pokemon);
        });

        return pokemons;
    }

    /**
     * Convert pokestops data
     * @param rawData - Raw pokestops data what came from API
     */
    function convertPokestopsData(rawData) {
        var pokestops = [];

        angular.forEach(rawData, function(data) {
            var pokestop = {
                type: GAME_ITEM_TYPES.pokestop,
                id: data['pokestop_id'],
                coords: {
                    latitude: data['latitude'],
                    longitude: data['longitude']
                },
                icon: {
                    url: gameUtilsService.getPokestopIcon(data['lure_expiration']),
                    scaledSize: { width: 25, height: 25 }
                },
                data: data
            };

            pokestops.push(pokestop);
        });

        return pokestops;
    }

    /**
     * Get team data by ID
     * @param teamId - Team ID
     */
    function getTeamData(teamId) {
        var iconPath = ENV.imagePaths.default;

        switch (teamId) {
            case 1:
                return {
                    data: GAME_TEAM_TYPES.instinct,
                    icon: iconPath + GAME_TEAM_TYPES.instinct.icon
                };
            case 2:
                return {
                    data: GAME_TEAM_TYPES.mystic,
                    icon: iconPath + GAME_TEAM_TYPES.mystic.icon
                };
            case 3:
                return {
                    data: GAME_TEAM_TYPES.valor,
                    icon: iconPath + GAME_TEAM_TYPES.valor.icon
                };
            default:
                return {
                    data: GAME_TEAM_TYPES.uncontested,
                    icon: iconPath + GAME_TEAM_TYPES.uncontested.icon
                };
        }
    }

    /**
     * Get pokestop icon (depends on activated lure module)
     * @param lure - Lure expiration time
     */
    function getPokestopIcon(lure) {
        return angular.isUndefinedOrNull(lure) ? ENV.imagePaths.default + 'pokestop.png' :
        ENV.imagePaths.default + 'pokestop_lure.png';
    }

    /**
     * Get pokemon name by id
     * @param id - Pokemon id
     */
    function getPokemonName(id) {
        for(var i = 0; i < POKEMONS.length; i++) {
            if(POKEMONS[i].id === id) {
                return POKEMONS[i].name;
            }
        }

        return '';
    }

    return gameUtilsService;

}

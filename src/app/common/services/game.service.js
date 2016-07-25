'use strict';

angular
    .module('angularApp')
    .service('GameService', GameService);

/**
 * Game service to handle game data
 */
/*@ngInject*/
function GameService(ENV) {

    return {
        convertGymsData: convertGymsData,
        convertPokemonsData: convertPokemonsData
    };

    /**
     * Convert gyms data
     * @param rawData - Raw gyms data what came from API
     */
    function convertGymsData(rawData) {
        var gyms = [];

        angular.forEach(rawData, function(data) {
            var gym = {
                id: data['gym_id'],
                coords: {
                    latitude: data['latitude'],
                    longitude: data['longitude']
                }
            };

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
                id: data['pokemon_id'],
                coords: {
                    latitude: data['latitude'],
                    longitude: data['longitude']
                },
                icon: ENV.imagePaths.pokemons + data['pokemon_id'] + '.png'
            };

            pokemons.push(pokemon);
        });

        return pokemons;
    }
}

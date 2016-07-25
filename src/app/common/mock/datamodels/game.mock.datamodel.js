'use strict';

angular
    .module('angularApp')
    .service('GameMockDataModel', GameMockDataModel);

/**
 * Data model for game
 */
/*@ngInject*/
function GameMockDataModel() {

    // Data model
    this.data = {
        'gyms': [
            {
                'enabled': true,
                'guard_pokemon_id': 142,
                'gym_id': 'e2b04674351844caa978eb2fffb0c364.16',
                'gym_points': 9198,
                'last_modified': 1469387956733,
                'latitude': 47.441185,
                'longitude': 19.03969,
                'team_id': 2
            },
            {
                'enabled': true,
                'guard_pokemon_id': 97,
                'gym_id': 'a21a343e73c1449f89ccff7bf83c8e48.16',
                'gym_points': 21386,
                'last_modified': 1469387762108,
                'latitude': 47.432029,
                'longitude': 19.071935,
                'team_id': 2
            },
            {
                'enabled': true,
                'guard_pokemon_id': 134,
                'gym_id': 'a59ff545e4624052b232ce9945225a84.16',
                'gym_points': 5467,
                'last_modified': 1469385906503,
                'latitude': 47.430443,
                'longitude': 19.065604,
                'team_id': 2
            },
            {
                'enabled': true,
                'guard_pokemon_id': 36,
                'gym_id': '114d982070794e638b260548dd21f244.16',
                'gym_points': 22038,
                'last_modified': 1469371379982,
                'latitude': 47.430661,
                'longitude': 19.06657,
                'team_id': 2
            },
            {
                'enabled': true,
                'guard_pokemon_id': 134,
                'gym_id': 'ef8c8cc97d7140b48418a84a4a1d80af.16',
                'gym_points': 15373,
                'last_modified': 1469387133205,
                'latitude': 47.426888,
                'longitude': 19.070361,
                'team_id': 2
            },
            {
                'enabled': true,
                'guard_pokemon_id': 123,
                'gym_id': 'f8e7d744cd3e4672b55904f3e63fd509.11',
                'gym_points': 2000,
                'last_modified': 1469387827094,
                'latitude': 47.42114,
                'longitude': 19.067465,
                'team_id': 2
            },
            {
                'enabled': true,
                'guard_pokemon_id': 134,
                'gym_id': '32abd7a77de14731b6bd7a6f84b16420.16',
                'gym_points': 6206,
                'last_modified': 1469373758987,
                'latitude': 47.419601,
                'longitude': 19.06544,
                'team_id': 1
            },
            {
                'enabled': true,
                'guard_pokemon_id': 20,
                'gym_id': '92d597c6ac1144b8ba196b290fbc7936.16',
                'gym_points': 2000,
                'last_modified': 1469385839275,
                'latitude': 47.420059,
                'longitude': 19.07256,
                'team_id': 1
            },
            {
                'enabled': true,
                'guard_pokemon_id': 127,
                'gym_id': 'b1dc1fe852e444ee9c78488dc6385eb8.16',
                'gym_points': 4500,
                'last_modified': 1469385905386,
                'latitude': 47.405012,
                'longitude': 19.016589,
                'team_id': 2
            },
            {
                'enabled': true,
                'guard_pokemon_id': 134,
                'gym_id': '7345e8476bed4d9f8413e1afae0913b6.16',
                'gym_points': 4200,
                'last_modified': 1469382681430,
                'latitude': 47.413265,
                'longitude': 19.011379,
                'team_id': 3
            }
        ],
        'pokemons': [
            {
                'disappear_time': 1469440103532,
                'encounter_id': 'MTcxMzQyMDUzNjgxNzI5MjkxNDk=',
                'latitude': 47.4263831387732,
                'longitude': 19.040191820673552,
                'pokemon_id': 133,
                'pokemon_name': 'Eevee',
                'spawnpoint_id': '4741e79bbc3'
            },
            {
                'disappear_time': 1469439920780,
                'encounter_id': 'NjYwNTEwMzQ4NDU4Njk2ODkyNQ==',
                'latitude': 47.42640076544301,
                'longitude': 19.040550866164356,
                'pokemon_id': 96,
                'pokemon_name': 'Drowzee',
                'spawnpoint_id': '4741e79bbbb'
            },
            {
                'disappear_time': 1479459776900,
                'encounter_id': 'OTIxMDAwOTg3OTgyMDY0ODE3Mw==',
                'latitude': 47.42762365093011,
                'longitude': 19.04266981694098,
                'pokemon_id': 16,
                'pokemon_name': 'Pidgey',
                'spawnpoint_id': '4741e79ae29'
            },
            {
                'disappear_time': 1469439901932,
                'encounter_id': 'Njk3NzIzNTczNzAxNDY4OTE5Nw==',
                'latitude': 47.424787769387436,
                'longitude': 19.038393112361508,
                'pokemon_id': 13,
                'pokemon_name': 'Weedle',
                'spawnpoint_id': '4741e7995eb'
            },
            {
                'disappear_time': 1469439946116,
                'encounter_id': 'OTIzOTM4NTUyOTQ5Njc4MTI5Mw==',
                'latitude': 47.427855272541805,
                'longitude': 19.03901491228598,
                'pokemon_id': 14,
                'pokemon_name': 'Kakuna',
                'spawnpoint_id': '4741e79c821'
            },
            {
                'disappear_time': 1469439487852,
                'encounter_id': 'NTEyMjE1OTAzMTUyNDE5ODM5Nw==',
                'latitude': 47.42627709629974,
                'longitude': 19.038962267770007,
                'pokemon_id': 16,
                'pokemon_name': 'Pidgey',
                'spawnpoint_id': '4741e79b92b'
            },
            {
                'disappear_time': 1469439304420,
                'encounter_id': 'MTAyODM0NzA0MzUyODA4MDczMjU=',
                'latitude': 47.429184096858,
                'longitude': 19.042825929906886,
                'pokemon_id': 43,
                'pokemon_name': 'Oddish',
                'spawnpoint_id': '4741e79b2d9'
            },
            {
                'disappear_time': 1469439941436,
                'encounter_id': 'MTczNjMzMjM3MzA5Njg5MTIzMDE=',
                'latitude': 47.42812005644207,
                'longitude': 19.04301373410136,
                'pokemon_id': 41,
                'pokemon_name': 'Zubat',
                'spawnpoint_id': '4741e79adff'
            },
            {
                'disappear_time': 1469439564796,
                'encounter_id': 'ODY2ODg4MDQxOTgxNzI4MDk3Mw==',
                'latitude': 47.428261887209665,
                'longitude': 19.043111997900038,
                'pokemon_id': 35,
                'pokemon_name': 'Clefairy',
                'spawnpoint_id': '4741e79adf7'
            }
        ]
    };

    /**
     * Getter
     */
    this.getData = function() {
        return this.data;
    };

    /**
     * Setter
     * @param data - Data model
     */
    this.setData = function(data) {
        this.data = data;
    };

    /**
     * Get all elems from model
     */
    this.findAll = function() {
        return this.getData();
    };

}

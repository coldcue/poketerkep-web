'use strict';

angular
    .module('angularApp')
    .service('GameMockDataModel', GameMockDataModel);

/**
 * Data model for game
 */
/*@ngInject*/
function GameMockDataModel(FILTER_STATES) {

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
                'pokemon_id': 133
            },
            {
                'disappear_time': 1469439920780,
                'encounter_id': 'NjYwNTEwMzQ4NDU4Njk2ODkyNQ==',
                'latitude': 47.42640076544301,
                'longitude': 19.040550866164356,
                'pokemon_id': 96
            },
            {
                'disappear_time': 1479459776900,
                'encounter_id': 'OTIxMDAwOTg3OTgyMDY0ODE3Mw==',
                'latitude': 47.42762365093011,
                'longitude': 19.04266981694098,
                'pokemon_id': 16
            },
            {
                'disappear_time': 1469439901932,
                'encounter_id': 'Njk3NzIzNTczNzAxNDY4OTE5Nw==',
                'latitude': 47.424787769387436,
                'longitude': 19.038393112361508,
                'pokemon_id': 13
            },
            {
                'disappear_time': 1469439946116,
                'encounter_id': 'OTIzOTM4NTUyOTQ5Njc4MTI5Mw==',
                'latitude': 47.427855272541805,
                'longitude': 19.03901491228598,
                'pokemon_id': 14
            },
            {
                'disappear_time': 1469439487852,
                'encounter_id': 'NTEyMjE1OTAzMTUyNDE5ODM5Nw==',
                'latitude': 47.42627709629974,
                'longitude': 19.038962267770007,
                'pokemon_id': 16
            },
            {
                'disappear_time': 1469439304420,
                'encounter_id': 'MTAyODM0NzA0MzUyODA4MDczMjU=',
                'latitude': 47.429184096858,
                'longitude': 19.042825929906886,
                'pokemon_id': 43
            },
            {
                'disappear_time': 1469439941436,
                'encounter_id': 'MTczNjMzMjM3MzA5Njg5MTIzMDE=',
                'latitude': 47.42812005644207,
                'longitude': 19.04301373410136,
                'pokemon_id': 41
            },
            {
                'disappear_time': 1469439564796,
                'encounter_id': 'ODY2ODg4MDQxOTgxNzI4MDk3Mw==',
                'latitude': 47.428261887209665,
                'longitude': 19.043111997900038,
                'pokemon_id': 35
            }
        ],
        'pokestops': [
            {
                'active_pokemon_id': null,
                'enabled': true,
                'last_modified': 1467338281737,
                'latitude': 47.44382,
                'longitude': 19.037155,
                'lure_expiration': null,
                'pokestop_id': 'a35627e5105f4e84b6ca1b72a2c7630f.16'
            },
            {
                'active_pokemon_id': null,
                'enabled': true,
                'last_modified': 1468600858911,
                'latitude': 47.443663,
                'longitude': 19.038987,
                'lure_expiration': null,
                'pokestop_id': '35fe86cd8edc4d62a2d0a7cb963e4b1b.16'
            },
            {
                'active_pokemon_id': null,
                'enabled': true,
                'last_modified': 1469364581870,
                'latitude': 47.442962,
                'longitude': 19.036705,
                'lure_expiration': null,
                'pokestop_id': '31aa327504b141e7a8f2d4acefc1b7af.16'
            },
            {
                'active_pokemon_id': null,
                'enabled': true,
                'last_modified': 1467338281735,
                'latitude': 47.447573,
                'longitude': 19.048023,
                'lure_expiration': null,
                'pokestop_id': '4f0acfc182304b9aa93215438fda05a1.16'
            },
            {
                'active_pokemon_id': null,
                'enabled': true,
                'last_modified': 1469311365957,
                'latitude': 47.430284,
                'longitude': 19.06953,
                'lure_expiration': null,
                'pokestop_id': '274c07d791204b0e92d16eac7a8f0847.16'
            },
            {
                'active_pokemon_id': null,
                'enabled': true,
                'last_modified': 1469367084076,
                'latitude': 47.431394,
                'longitude': 19.068604,
                'lure_expiration': null,
                'pokestop_id': '8cd8c97821654c24be3f9960f669bba9.16'
            },
            {
                'active_pokemon_id': null,
                'enabled': true,
                'last_modified': 1469258691216,
                'latitude': 47.430171,
                'longitude': 19.071888,
                'lure_expiration': null,
                'pokestop_id': '13299b07617d4509ab493f54aaf93fda.16'
            },
            {
                'active_pokemon_id': null,
                'enabled': true,
                'last_modified': 1467338232231,
                'latitude': 47.434821,
                'longitude': 19.068215,
                'lure_expiration': null,
                'pokestop_id': 'b5ff72f4950b401f914e2dc3e803d432.16'
            },
            {
                'active_pokemon_id': null,
                'enabled': true,
                'last_modified': 1467338232231,
                'latitude': 47.431556,
                'longitude': 19.067724,
                'lure_expiration': null,
                'pokestop_id': '976d1ba9e23147dba4de5a47d1115056.16'
            },
            {
                'active_pokemon_id': null,
                'enabled': true,
                'last_modified': 1469033434268,
                'latitude': 47.430542,
                'longitude': 19.070769,
                'lure_expiration': null,
                'pokestop_id': 'da415e1cfdf34172bfcd4477da3412b2.16'
            },
            {
                'active_pokemon_id': null,
                'enabled': true,
                'last_modified': 1469377173558,
                'latitude': 47.431833,
                'longitude': 19.069469,
                'lure_expiration': null,
                'pokestop_id': '373ebc2a6bb349c39bc07942a2c3153c.11'
            },
            {
                'active_pokemon_id': null,
                'enabled': true,
                'last_modified': 1467338232231,
                'latitude': 47.4294,
                'longitude': 19.069145,
                'lure_expiration': null,
                'pokestop_id': 'a3ada125eaad40059f2e344c5c87e9ed.11'
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

    /**
     * Get filtered model
     * @param filters - Filters object
     */
    this.getFiltered = function(filters) {
        var data = this.getData();
        filters = JSON.parse(filters);

        // No mock for bounds and selected pokemons
        return {
            gyms: (filters.gyms === FILTER_STATES.show ? data.gyms : []),
            pokemons: (filters.pokemons === FILTER_STATES.show ? data.pokemons : []),
            pokestops: (filters.pokestops === FILTER_STATES.show ? data.pokestops : [])
        };
    };

}

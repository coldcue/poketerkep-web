'use strict';

angular
    .module('angularApp')

    /**
     * Game item types
     */
    .constant('GAME_ITEM_TYPES', {
        pokemon: 'Pokémon',
        gym: 'Gym',
        pokestop: 'Pokéstop'
    });

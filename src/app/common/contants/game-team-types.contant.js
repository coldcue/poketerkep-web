'use strict';

angular
    .module('angularApp')

    /**
     * Game team types
     */
    .constant('GAME_TEAM_TYPES', {
        instinct: {
            id: 1,
            name: 'Instinct',
            icon: 'instinct.png'
        },
        mystic: {
            id: 2,
            name: 'Mystic',
            icon: 'mystic.png'
        },
        valor: {
            id: 3,
            name: 'Valor',
            icon: 'valor.png'
        },
        uncontested: {
            id: null,
            name: 'Nem elfoglalt',
            icon: 'uncontested.png'
        }
    });

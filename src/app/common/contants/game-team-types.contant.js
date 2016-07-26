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
            icon: 'instinct@2x.png'
        },
        mystic: {
            id: 2,
            name: 'Mystic',
            icon: 'mystic@2x.png'
        },
        valor: {
            id: 3,
            name: 'Valor',
            icon: 'valor@2x.png'
        },
        uncontested: {
            id: null,
            name: 'Nem elfoglalt',
            icon: 'uncontested@2x.png'
        }
    });

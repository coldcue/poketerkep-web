'use strict';

angular
    .module('angularApp')
    .service('GameDTO', GameDTO);

/**
 * Game DTO
 */
/*@ngInject*/
function GameDTO(GameUtilsService, StorageService) {

    var _this = this;

    // Global variables
    _this.game = {
        gyms: [],
        pokemons: [],
        pokestops: []
    };
    _this.filterStates = {
        pokemons: true,
        gyms: false,
        pokestops: false,
        showOrHide: true
    };
    _this.selectedPokemons = [];

    /**
     * Init GameDTO global variables
     */
    _this.init = function() {
        var storageFilterStates = StorageService.get('filterStates');
        var storageSelectedPokemons = StorageService.get('selectedPokemons');

        if(!angular.isUndefinedOrNull(storageFilterStates)) {
            _this.filterStates = storageFilterStates;
        }

        if(!angular.isUndefinedOrNull(storageSelectedPokemons)) {
            _this.selectedPokemons = storageSelectedPokemons;
        }

        return true;
    };

    /**
     * Get game object
     */
    _this.getGame = function() {
        return _this.game;
    };

    /**
     * Set game object
     * @param data - Game data object
     */
    _this.setGame = function(data) {
        _this.game = data;
        return true;
    };

    /**
     * Set raw game object and convert it to internal format
     * @param data - RAW Game data object
     */
    _this.setRAWGame = function(data) {
        _this.game.gyms = GameUtilsService.convertGymsData(data.gyms);
        _this.game.pokemons = GameUtilsService.convertPokemonsData(data.pokemons);
        _this.game.pokestops = GameUtilsService.convertPokestopsData(data.pokestops);
        return true;
    };

    /**
     * Get filterStates object
     */
    _this.getFilterStates = function() {
        return _this.filterStates;
    };

    /**
     * Set filterStates object
     * @param filterStates - filterStates object
     */
    _this.setFilterStates = function(filterStates) {
        _this.filterStates = filterStates;
        StorageService.set('filterStates', filterStates);
        return true;
    };

    /**
     * Get selectedPokemons object
     */
    _this.getSelectedPokemons = function() {
        return _this.selectedPokemons;
    };

    /**
     * Set selectedPokemons object
     * @param selectedPokemons - selectedPokemons object
     */
    _this.setSelectedPokemons = function(selectedPokemons) {
        _this.selectedPokemons = selectedPokemons;
        StorageService.set('selectedPokemons', selectedPokemons);
        return true;
    };

    /**
     * Get filtered game object
     */
    _this.getFilteredGame = function() {
        return {
            pokemons: (_this.filterStates.pokemons ? _this.getFilteredPokemons() : []),
            gyms: (_this.filterStates.gyms ? _this.game.gyms : []),
            pokestops: (_this.filterStates.pokestops ? _this.game.pokestops : [])
        };
    };

    /**
     * Get filtered pokemons
     */
    _this.getFilteredPokemons = function() {
        var filteredPokemons = (_this.filterStates.showOrHide ? [] : angular.copy(_this.game.pokemons));

        // If there is no element in selected pokemons list then we return the whole list
        if(_this.selectedPokemons.length === 0) {
            return _this.game.pokemons;
        }

        // Iterate over selected pokemons list
        angular.forEach(_this.selectedPokemons, function(selectedPokemon) {
            if(_this.filterStates.showOrHide) {
                // If we have to show selected pokemons
                angular.forEach(_this.game.pokemons, function(pokemon) {
                    if(pokemon.data['pokemon_id'] === selectedPokemon.id) {
                        filteredPokemons.push(pokemon);
                    }
                });
            } else {
                // If we have to hide selected pokemons
                angular.forEach(filteredPokemons, function(pokemon, key) {
                    if(pokemon.data['pokemon_id'] === selectedPokemon.id) {
                        filteredPokemons.splice(key, 1);
                    }
                });
            }
        });

        return filteredPokemons;
    };

}

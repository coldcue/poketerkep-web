'use strict';

angular
    .module('angularApp')
    .service('GameDTO', GameDTO);

/**
 * Game DTO
 */
/*@ngInject*/
function GameDTO(GameUtilsService, StorageService) {

    // Global variables
    this.game = {
        gyms: [],
        pokemons: [],
        pokestops: []
    };
    this.filterStates = {
        pokemons: true,
        gyms: false,
        pokestops: false,
        showOrHide: true
    };
    this.selectedPokemons = [];

    /**
     * Init GameDTO global variables
     */
    this.init = function() {
        var storageFilterStates = StorageService.get('filterStates');
        var storageSelectedPokemons = StorageService.get('selectedPokemons');

        if(!angular.isUndefinedOrNull(storageFilterStates)) {
            this.filterStates = storageFilterStates;
        }

        if(!angular.isUndefinedOrNull(storageSelectedPokemons)) {
            this.selectedPokemons = storageSelectedPokemons;
        }

        return true;
    };

    /**
     * Get game object
     */
    this.getGame = function() {
        return this.game;
    };

    /**
     * Set game object
     */
    this.setGame = function(data) {
        this.game = data;
        return true;
    };

    /**
     * Set raw game object and convert it to internal format
     */
    this.setRAWGame = function(data) {
        this.game.gyms = GameUtilsService.convertGymsData(data.gyms);
        this.game.pokemons = GameUtilsService.convertPokemonsData(data.pokemons);
        this.game.pokestops = GameUtilsService.convertPokestopsData(data.pokestops);
        return true;
    };

    /**
     * Get filterStates object
     */
    this.getFilterStates = function() {
        return this.filterStates;
    };

    /**
     * Set filterStates object
     */
    this.setFilterStates = function(filterStates) {
        this.filterStates = filterStates;
        StorageService.set('filterStates', filterStates);
        return true;
    };

    /**
     * Get selectedPokemons object
     */
    this.getSelectedPokemons = function() {
        return this.selectedPokemons;
    };

    /**
     * Set selectedPokemons object
     */
    this.setSelectedPokemons = function(selectedPokemons) {
        this.selectedPokemons = selectedPokemons;
        StorageService.set('selectedPokemons', selectedPokemons);
        return true;
    };

    /**
     * Get filtered game object
     */
    this.getFilteredGame = function() {
        return {
            pokemons: (this.filterStates.pokemons ? this.getFilteredPokemons() : []),
            gyms: (this.filterStates.gyms ? this.game.gyms : []),
            pokestops: (this.filterStates.pokestops ? this.game.pokestops : [])
        };
    };

    /**
     * Get filtered pokemons
     */
    this.getFilteredPokemons = function() {
        var _this = this;
        var filteredPokemons = (this.filterStates.showOrHide ? [] : angular.copy(this.game.pokemons));

        // if there is no element in selected pokemons list then we return the whole list
        if(_this.selectedPokemons.length === 0) {
            return _this.game.pokemons;
        }

        // iterate over selected pokemons list
        angular.forEach(_this.selectedPokemons, function(selectedPokemon) {
            if(_this.filterStates.showOrHide) {
                // if we have to show selected pokemons
                angular.forEach(_this.game.pokemons, function(pokemon) {
                    if(pokemon.data['pokemon_id'] === selectedPokemon.id) {

                        filteredPokemons.push(pokemon);
                    }
                });
            } else {
                // if we have to hide selected pokemons
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

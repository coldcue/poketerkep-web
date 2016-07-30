'use strict';

angular
    .module('angularApp')
    .controller('MapController', MapController);

/**
 * Controller for full map
 */
/*@ngInject*/
function MapController(ENV, GAME_ITEM_TYPES, GameDataService, MapDTO, GameDTO, $interval, $rootScope) {

    // controllerAs with vm
    var vm = this;

    // Global variables
    var timer;

    // ViewModel bindings
    vm.map = {};
    vm.playerPosition = [];
    vm.gyms = [];
    vm.pokemons = [];
    vm.pokestops = [];
    vm.GAME_ITEM_TYPES = GAME_ITEM_TYPES;

    /**
     * Constructor, initialize
     */
    function init() {
        GameDTO.init();

        MapDTO.init(getGameData, restartPolling);
        vm.map = MapDTO.getMap();
        vm.playerPosition = MapDTO.getPlayerPosition();

        $rootScope.$on('updateGameData', setMapData);
    }

    init();


    /**
     * Start getGameData polling
     */
    function startPolling() {
        timer = $interval(getGameData, ENV.mapDefaults.refreshTime);
    }

    /**
     * Stop getGameData polling
     */
    function stopPolling() {
        if (!angular.isUndefinedOrNull(timer)) {
            $interval.cancel(timer);
        }
    }

    /**
     * Restart getGameData polling
     */
    function restartPolling() {
        stopPolling();
        startPolling();
    }

    /**
     * Get game data from backend
     */
    function getGameData() {
        GameDataService.get(MapDTO.getQueryParams()).$promise.then(function (data) {
            GameDTO.setRAWGame(data);
            setMapData();
        });
    }

    /**
     * Get map data based on GameDTO data
     */
    function setMapData() {
        var gameData = GameDTO.getFilteredGame();
        vm.gyms = gameData.gyms;
        vm.pokemons = gameData.pokemons;
        vm.pokestops = gameData.pokestops;
    }

}

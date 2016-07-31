'use strict';

angular
    .module('angularApp')
    .controller('MapController', MapController);

/**
 * Controller for full map
 */
/*@ngInject*/
function MapController(GAME_ITEM_TYPES, GameDataService, MapDTO, GameDTO, $rootScope) {

    // controllerAs with vm
    var vm = this;

    // ViewModel variables
    vm.map = {};
    vm.playerPosition = [];
    vm.gyms = [];
    vm.pokemons = [];
    vm.pokestops = [];
    vm.GAME_ITEM_TYPES = GAME_ITEM_TYPES;

    // ViewModel functions
    vm.getGameData = getGameData;
    vm.setMapData = setMapData;

    /**
     * Constructor, initialize
     */
    function init() {
        GameDTO.init();

        MapDTO.init(getGameData);
        vm.map = MapDTO.getMap();
        vm.playerPosition = MapDTO.getPlayerPosition();

        $rootScope.$on('updateGameData', setMapData);
    }

    init();


    /**
     * Get game data from backend
     */
    function getGameData() {
        GameDataService.get(MapDTO.getQueryParams()).then(function (data) {
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

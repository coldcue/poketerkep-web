'use strict';

angular
    .module('angularApp')
    .controller('MapController', MapController);

/**
 * Controller for full map
 */
/*@ngInject*/
function MapController(ENV, GAME_ITEM_TYPES, GameDataService, MapDTO, GameDTO, GameUtilsService, $rootScope) {

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
    vm.GameUtilsService = GameUtilsService;

    /**
     * Constructor, initialize
     */
    function init() {
        GameDTO.init();

        MapDTO.init(vm.getGameData);
        vm.map = MapDTO.getMap();
        vm.playerPosition = MapDTO.getPlayerPosition();

        $rootScope.$on('updateGameData', vm.getGameData);
    }

    init();


    /**
     * Get game data from backend
     */
    function getGameData() {
        if (angular.isUndefinedOrNull(ENV.maintenance) && !ENV.maintenance) {
            if (!angular.isUndefinedOrNull(vm.request)) {
                vm.request.$cancelRequest();
            }

            var params = {
                selectedPokemons: GameDTO.getSelectedPokemonsForAPI()
            };

            angular.extend(params, MapDTO.getBounds());
            angular.extend(params, GameDTO.getFilterStates());

            vm.request = GameDataService.get(params, function (data) {
                GameDTO.setRAWGame(data);
                vm.setMapData();
            });
        }
    }

    /**
     * Get map data based on GameDTO data
     */
    function setMapData() {
        var gameData = GameDTO.getGame();

        vm.gyms = gameData.gyms;
        vm.pokemons = gameData.pokemons;
        vm.pokestops = gameData.pokestops;
    }

}

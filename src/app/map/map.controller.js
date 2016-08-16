'use strict';

angular
    .module('angularApp')
    .controller('MapController', MapController);

/**
 * Controller for full map
 */
/*@ngInject*/
function MapController(ENV, GAME_ITEM_TYPES, GameDataService, MapDTO, GameDTO, GameUtilsService, StorageService,
                       UserAgentService, $rootScope) {

    // controllerAs with vm
    var vm = this;

    // ViewModel variables
    vm.map = {};
    vm.playerPosition = [];
    vm.gyms = [];
    vm.pokemons = [];
    vm.pokestops = [];
    vm.homeScreenPopup = false;
    vm.GAME_ITEM_TYPES = GAME_ITEM_TYPES;

    // ViewModel functions
    vm.GameUtilsService = GameUtilsService;
    vm.getGameData = getGameData;
    vm.setMapData = setMapData;
    vm.showHomeScreenPopup = showHomeScreenPopup;
    vm.hideHomeScreenPopup = hideHomeScreenPopup;

    /**
     * Constructor, initialize
     */
    function init() {
        GameDTO.init();

        MapDTO.init(vm.getGameData);
        vm.map = MapDTO.getMap();
        vm.playerPosition = MapDTO.getPlayerPosition();

        vm.showHomeScreenPopup();

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

        console.log(vm.pokemons);
        vm.gyms = gameData.gyms;
        vm.pokemons = gameData.pokemons;
        vm.pokestops = gameData.pokestops;
    }

    /**
     * Show home screen popup if it's acceptable
     */
    function showHomeScreenPopup() {
        var savedState = StorageService.get('homeScreenPopup');

        // first time we don't show anything
        if(angular.isUndefinedOrNull(savedState)) {
            StorageService.set('homeScreenPopup', 'firstTime');
            return;
        }

        // only second time we show a popup, if user closes it we won't show it anymore
        if(savedState) {
            if(UserAgentService.isAndroid(savedState)) {
                vm.homeScreenPopup = 'Android';
                return;
            } else if(UserAgentService.isMobileSafari(savedState)) {
                vm.homeScreenPopup = 'iOS';
                return;
            }
        }

        vm.hideHomeScreenPopup();
    }

    /**
     * Hide home screen popup and permanently disable showing it again
     */
    function hideHomeScreenPopup() {
        vm.homeScreenPopup = false;
        StorageService.set('homeScreenPopup', vm.homeScreenPopup);
    }

}

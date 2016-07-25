'use strict';

angular
    .module('angularApp')
    .controller('HomepageController', HomepageController);

/**
 * Controller for homepage
 */
/*@ngInject*/
function HomepageController(ENV, GameDataService, GameService, $window, $log) {

    // controllerAs with vm
    var vm = this;

    // Global variables
    vm.playerPosition = [];
    vm.pokemons = [];

    /**
     * Constructor, initialize
     */
    function init() {
        setMapDefaults();
        getGameData();
        getPlayerPosition();
    }

    init();

    /**
     * Set google maps defaults
     */
    function setMapDefaults() {
        vm.map = {
            center: (angular.isDefined(vm.playerPosition) && vm.playerPosition.length === 1 ?
                angular.copy(vm.playerPosition[0].coords) : ENV.mapDefaults.center),
            zoom: ENV.mapDefaults.zoom
        };
    }

    /**
     * Get player position
     */
    function getPlayerPosition() {
        if (angular.isDefined($window.navigator.geolocation)) {
            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    vm.playerPosition = [{
                        id: 'player',
                        coords: {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        }
                    }];
                    setMapDefaults();
                    vm.map.setCenter(vm.playerPosition[0].coords);
                },
                function (error) {
                    $log.warn('Unable to get player position: ' + error.message);
                },
                {
                    enableHighAccuracy: true
                }
            );
        }
    }

    /**
     * Get game data from backend
     */
    function getGameData() {
        GameDataService.get().$promise.then(function (data) {
            vm.pokemons = GameService.convertPokemonsData(data.pokemons);
        });
    }

}

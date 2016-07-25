'use strict';

angular
    .module('angularApp')
    .controller('HomepageController', HomepageController);

/**
 * Controller for homepage
 */
/*@ngInject*/
function HomepageController(ENV, GameDataService, GameService, $window, $log, uiGmapIsReady) {

    // controllerAs with vm
    var vm = this;

    // Global variables
    vm.lastMarker = undefined;
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
            center: ENV.mapDefaults.center,
            zoom: ENV.mapDefaults.zoom,
            markerEvent: {
                click: function (marker, eventName, model) {
                    vm.map.window.model = model;
                    vm.map.window.show = true;
                }
            },
            window: {
                marker: {},
                show: false,
                closeClick: function() {
                    this.show = false;
                }
            }
        };
    }

    /**
     * Get player position
     */
    function getPlayerPosition() {
        if (angular.isDefined($window.navigator.geolocation)) {
            uiGmapIsReady.promise().then(function (maps) {
                $window.navigator.geolocation.getCurrentPosition(
                    function (position) {
                        vm.playerPosition = [{
                            id: 'player',
                            coords: {
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude
                            }
                        }];

                        var map = maps[0].map;
                        map.setCenter({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        });
                    },
                    function (error) {
                        $log.warn('Unable to get player position: ' + error.message);
                    },
                    {
                        enableHighAccuracy: true
                    }
                );
            });
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

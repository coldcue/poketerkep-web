'use strict';

angular
    .module('angularApp')
    .controller('MapController', MapController);

/**
 * Controller for full map
 */
/*@ngInject*/
function MapController(ENV, GAME_ITEM_TYPES, GameDataService, GameDTO, StorageService, $window, $log, $interval,
                       $rootScope, uiGmapIsReady) {

    // controllerAs with vm
    var vm = this;

    // Global variables
    var timer,
        queryParams = {},
        centerRelocation = true;

    // ViewModel bindings
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

        setMapDefaults();
        getPlayerPosition();

        $rootScope.$on('updateGameData', setMapData);
    }

    init();

    /**
     * Set google maps defaults
     */
    function setMapDefaults() {
        vm.map = {
            center: StorageService.get('playerPosition') || ENV.mapDefaults.center,
            zoom: ENV.mapDefaults.zoom,
            mapEvents: {
                'dragstart': function() {
                    centerRelocation = false;
                },
                'idle': function(map) {
                    var bounds = map.getBounds();

                    queryParams = {
                        neLat: bounds.getNorthEast().lat(),
                        neLng: bounds.getNorthEast().lng(),
                        swLat: bounds.getSouthWest().lat(),
                        swLng: bounds.getSouthWest().lng()
                    };

                    getGameData();
                    restartPolling();
                }
            },
            mapOptions: {
                streetViewControl: false,
                mapTypeControl: false
            },
            markerEvents: {
                click: function (marker, eventName, model) {
                    vm.map.window.model = model;
                    vm.map.window.show = true;
                }
            },
            window: {
                marker: {},
                model: null,
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
                var map = maps[0].map;

                // set player last position based on local storage
                setPlayerPosition(map, StorageService.get('playerPosition'));

                // get fresh player position
                $window.navigator.geolocation.getCurrentPosition(
                    function (position) {
                        var playerPosition = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude
                        };

                        StorageService.set('playerPosition', playerPosition);
                        setPlayerPosition(map, playerPosition);
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
     * Set player position marker
     * @param map - Google map object
     * @param coords - Position coords value pair
     */
    function setPlayerPosition(map, coords) {
        if(!angular.isUndefinedOrNull(map) && !angular.isUndefinedOrNull(coords) &&
            !angular.isUndefinedOrNull(coords.latitude)) {
            vm.playerPosition = [{
                id: 'player',
                coords: coords
            }];

            if(centerRelocation) {
                map.setCenter({
                    lat: coords.latitude,
                    lng: coords.longitude
                });
            }
        }
    }

    /**
     * Start getGameData polling
     */
    function startPolling() {
        timer = $interval(getGameData, 5000);
    }

    /**
     * Stop getGameData polling
     */
    function stopPolling() {
        if(!angular.isUndefinedOrNull(timer)) {
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
        GameDataService.get(queryParams).$promise.then(function (data) {
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

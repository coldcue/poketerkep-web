'use strict';

angular
    .module('angularApp')
    .service('MapDTO', MapDTO);

/**
 * Map DTO
 */
/*@ngInject*/
function MapDTO(ENV, StorageService, $window, $log, uiGmapIsReady) {

    var _this = this;

    // Global variables
    _this.map = {};
    _this.queryParams = {};
    _this.trackingEnabled = true;
    _this.playerPosition = [];

    /**
     * Init MapDTO defaults
     * @param getGameData - Attach getGameData function (in map controller)
     * @param restartPolling - Attach restartPolling function (in map controller)
     */
    _this.init = function (getGameData, restartPolling) {
        _this.map = {
            center: StorageService.get('playerPosition') || ENV.mapDefaults.center,
            zoom: ENV.mapDefaults.zoom,
            mapEvents: {
                'dragstart': function () {
                    _this.trackingEnabled = false;
                },
                'idle': function (map) {
                    var bounds = map.getBounds();

                    _this.queryParams = {
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
                    _this.map.window.model = model;
                    _this.map.window.show = true;
                }
            },
            window: {
                marker: {},
                model: null,
                show: false,
                closeClick: function () {
                    _this.show = false;
                }
            }
        };

        _this.detectPlayerPosition();

        return true;
    };

    /**
     * Get map object
     */
    _this.getMap = function() {
        return _this.map;
    };

    /**
     * Get player position object
     */
    _this.getPlayerPosition = function() {
        return _this.playerPosition;
    };

    /**
     * Get query params object
     */
    _this.getQueryParams = function() {
        return _this.queryParams;
    };

    /**
     * Check if tracking is enabled or not
     */
    _this.isTrackingEnabled = function() {
        return _this.trackingEnabled;
    };

    /**
     * Get player position
     */
    _this.detectPlayerPosition = function () {
        if (angular.isDefined($window.navigator.geolocation)) {
            // Set player last position based on local storage
            _this.setPlayerPosition(StorageService.get('playerPosition'));

            // Get fresh player position
            $window.navigator.geolocation.watchPosition(
                function (position) {
                    var playerPosition = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };

                    StorageService.set('playerPosition', playerPosition);
                    _this.setPlayerPosition(playerPosition);
                },
                function (error) {
                    $log.warn('Unable to get player position: ' + error.message);
                },
                {
                    enableHighAccuracy: true
                }
            );
        }
    };

    /**
     * Set player position marker
     * @param coords - Position coords value pair
     */
    _this.setPlayerPosition = function(coords) {
        if (!angular.isUndefinedOrNull(coords) && !angular.isUndefinedOrNull(coords.latitude)) {
            // Recreate playerPosition array, because of triggering change watcher
            _this.playerPosition.length = 0;
            _this.playerPosition.push.apply(_this.playerPosition, [{
                id: 'player',
                coords: coords,
                icon: {
                    url: ENV.imagePaths.default + 'pokemaster.png',
                    scaledSize: {width: 40, height: 40}
                }
            }]);

            _this.setMapCenterByPlayer();
        }
    };

    /**
     * Set map center position by player
     */
    _this.setMapCenterByPlayer = function() {
        if (_this.trackingEnabled) {
            uiGmapIsReady.promise().then(function (maps) {
                var map = maps[0].map;

                // panTo instead of setCenter to produce smoother map moving
                map.panTo({
                    lat: _this.playerPosition[0].coords.latitude,
                    lng: _this.playerPosition[0].coords.longitude
                });

                _this.map.zoom = ENV.mapDefaults.zoom + 2;
            });
        }
    };

    /**
     * Enable position tracking
     */
    _this.enablePositionTracking = function() {
        _this.trackingEnabled = true;
        _this.setMapCenterByPlayer();
    };

}

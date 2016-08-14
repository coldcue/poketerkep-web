'use strict';

angular
    .module('angularApp')
    .service('MapDTO', MapDTO);

/**
 * Map DTO
 */
/*@ngInject*/
function MapDTO(ENV, StorageService, IntervalService, $window, $log, uiGmapIsReady, Utils) {

    var _this = this;

    // Global variables
    _this.map = {};
    _this.bounds = {};
    _this.trackingEnabled = true;
    _this.playerPosition = [];
    _this.zoomChangedProgramatically = false;

    /**
     * Init MapDTO defaults
     * @param getGameData - Attach getGameData function (in map controller)
     */
    _this.init = function (getGameData) {
        _this.map = {
            center: StorageService.get('playerPosition') || ENV.mapDefaults.center,
            zoom: ENV.mapDefaults.zoom,
            mapEvents: {
                'dragstart': function () {
                    _this.trackingEnabled = false;
                },
                'idle': function (map) {
                    var bounds = map.getBounds();

                    _this.bounds = {
                        neLat: Number(bounds.getNorthEast().lat().toFixed(8)),
                        neLng: Number(bounds.getNorthEast().lng().toFixed(8)),
                        swLat: Number(bounds.getSouthWest().lat().toFixed(8)),
                        swLng: Number(bounds.getSouthWest().lng().toFixed(8))
                    };

                    getGameData();
                    IntervalService.restartInterval(getGameData);
                },
                'zoom_changed': function () {
                    if (!_this.zoomChangedProgramatically) {
                        _this.trackingEnabled = false;
                    }

                    _this.zoomChangedProgramatically = false;
                }
            },
            mapOptions: {
                streetViewControl: false,
                mapTypeControl: false,
                clickableIcons: false,
                styles: [
                    {
                        'featureType': 'landscape.man_made',
                        'elementType': 'geometry.fill',
                        'stylers': [{'color': '#a1f199'}]
                    }, {
                        'featureType': 'landscape.natural.landcover',
                        'elementType': 'geometry.fill',
                        'stylers': [{'color': '#37bda2'}]
                    }, {
                        'featureType': 'landscape.natural.terrain',
                        'elementType': 'geometry.fill',
                        'stylers': [{'color': '#37bda2'}]
                    }, {
                        'featureType': 'poi.attraction',
                        'elementType': 'geometry.fill',
                        'stylers': [{'visibility': 'on'}]
                    }, {
                        'featureType': 'poi.business',
                        'elementType': 'geometry.fill',
                        'stylers': [{'color': '#e4dfd9'}]
                    }, {
                        'featureType': 'poi.business',
                        'elementType': 'labels.icon',
                        'stylers': [{'visibility': 'off'}]
                    }, {
                        'featureType': 'poi.park',
                        'elementType': 'geometry.fill',
                        'stylers': [{'color': '#37bda2'}]
                    }, {
                        'featureType': 'road',
                        'elementType': 'geometry.fill',
                        'stylers': [{'color': '#84b09e'}]
                    }, {
                        'featureType': 'road',
                        'elementType': 'geometry.stroke',
                        'stylers': [{'color': '#fafeb8'}, {'weight': '1.25'}]
                    }, {
                        'featureType': 'road.highway',
                        'elementType': 'labels.icon',
                        'stylers': [{'visibility': 'off'}]
                    }, {
                        'featureType': 'water',
                        'elementType': 'geometry.fill',
                        'stylers': [{'color': '#5ddad6'}]
                    }
                ]
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
                    this.show = false;
                }
            }
        };

        _this.detectPlayerPosition();

        return true;
    };

    /**
     * Get map object
     */
    _this.getMap = function () {
        return _this.map;
    };

    /**
     * Get player position object
     */
    _this.getPlayerPosition = function () {
        return _this.playerPosition;
    };

    /**
     * Get bounds object
     */
    _this.getBounds = function () {
        return _this.bounds;
    };

    /**
     * Check if tracking is enabled or not
     */
    _this.isTrackingEnabled = function () {
        return _this.trackingEnabled;
    };

    /**
     * Get player position
     */
    _this.detectPlayerPosition = function () {
        if (angular.isDefined($window.navigator.geolocation)) {
            // Set player last position based on local storage
            _this.setPlayerPosition(StorageService.get('playerPosition'));
            _this.setMapCenterByPlayer();

            // Get fresh player position
            $window.navigator.geolocation.watchPosition(
                function (position) {
                    var oldPosition = angular.copy(_this.getPlayerPosition());

                    var playerPosition = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    };

                    StorageService.set('playerPosition', playerPosition);
                    _this.setPlayerPosition(playerPosition);

                    // If player moved not so much (less than ~20-30 meters) map center reset is not required
                    if (!angular.isUndefinedOrNull(oldPosition) && oldPosition.length === 1 &&
                        !angular.isUndefinedOrNull(oldPosition[0].coords) &&
                        _this.comparePositions(oldPosition[0].coords, playerPosition, 4)) {
                        return;
                    }

                    _this.setMapCenterByPlayer();
                },
                function (error) {
                    $log.warn('Unable to get player position: ' + error.message);
                },
                {
                    enableHighAccuracy: true,
                    maximumAge: 1000 * 10 // GPS cache (10 seconds)
                }
            );
        }
    };

    /**
     * Set player position marker
     * @param coords - Position coords value pair
     */
    _this.setPlayerPosition = function (coords) {
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
        }
    };

    /**
     * Set map center position by player
     */
    _this.setMapCenterByPlayer = function () {
        if (_this.trackingEnabled && _this.playerPosition.length === 1) {
            uiGmapIsReady.promise().then(function (maps) {
                var map = maps[0].map;

                // panTo instead of setCenter to produce smoother map moving
                map.panTo({
                    lat: _this.playerPosition[0].coords.latitude,
                    lng: _this.playerPosition[0].coords.longitude
                });

                if (_this.map.zoom < 14) {
                    _this.zoomChangedProgramatically = true;
                    _this.map.zoom = ENV.mapDefaults.zoom;
                }
            });
        }
    };

    /**
     * Enable position tracking
     */
    _this.enablePositionTracking = function () {
        _this.trackingEnabled = true;
        _this.setMapCenterByPlayer();
    };

    /**
     * Compare to positions with specified precision, return true if they are the same
     * @param position1 - First position
     * @param position2 - Second position
     * @param precision - Precision number (decimal places)
     */
    _this.comparePositions = function (position1, position2, precision) {
        if (!angular.isUndefinedOrNull(position1) && !angular.isUndefinedOrNull(position2)) {
            return (Utils.parseNumberWithoutRounding(position1.latitude, precision) ===
                Utils.parseNumberWithoutRounding(position2.latitude, precision)) &&
                (Utils.parseNumberWithoutRounding(position1.longitude, precision) ===
                Utils.parseNumberWithoutRounding(position2.longitude, precision));
        }

        return false;
    };

}

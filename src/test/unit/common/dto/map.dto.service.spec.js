'use strict';

describe('Unit: MapDTO - service', function () {

    // Global variables
    var MapDTO, ENV, StorageService, uiGmapIsReady, $window, $q;

    // Mock coordinates
    var mockCoordinates = {
        latitude: 42.55,
        longitude: 16.32
    };

    // Mock StorageService
    var mockStorageService = {
        get: function (key) {
            if (key === 'playerPosition') {
                return mockCoordinates;
            }
        }
    };

    // Include app
    beforeEach(angular.mock.module('angularApp'));

    // Include test related dependencies
    beforeEach(angular.mock.inject(function (_MapDTO_, _ENV_, _StorageService_, _uiGmapIsReady_, _$window_, _$q_) {
        MapDTO = _MapDTO_;
        ENV = _ENV_;
        StorageService = _StorageService_;
        uiGmapIsReady = _uiGmapIsReady_;
        $window = _$window_;
        $q = _$q_;
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(MapDTO).toBeDefined();
    });

    it('should have init method be defined', function () {
        expect(MapDTO.init).toBeDefined();
    });

    it('should have init method which initializes map variables', function () {
        spyOn(MapDTO, 'detectPlayerPosition');
        spyOn(StorageService, 'get').and.callFake(function () {
            return undefined;
        });

        MapDTO.init(function () {});
        var map = MapDTO.getMap();

        expect(map.center).toEqual(ENV.mapDefaults.center);
        expect(map.zoom).toEqual(ENV.mapDefaults.zoom);
        expect(map.mapEvents).toBeDefined();
        expect(map.mapOptions).toBeDefined();
        expect(map.markerEvents).toBeDefined();
        expect(map.window).toBeDefined();

        expect(MapDTO.detectPlayerPosition).toHaveBeenCalled();
    });

    it('should have init method which initializes map variables differently if localStorage has values', function () {
        spyOn(StorageService, 'get').and.callFake(function (key) {
            return mockStorageService.get(key);
        });

        MapDTO.init(function () {});
        var map = MapDTO.getMap();

        expect(map.center).toEqual(mockCoordinates);
    });

    it('should have working custom map methods', function () {
        MapDTO.init(function () {});
        var map = MapDTO.getMap();

        var fakeGoogleMapObject = {
            getBounds: function() {
                return {
                    getNorthEast: function() {
                        return {
                            lat: function() {
                                return 40;
                            },
                            lng: function() {
                                return 30;
                            }
                        }
                    },
                    getSouthWest: function() {
                        return {
                            lat: function() {
                                return 20;
                            },
                            lng: function() {
                                return 10;
                            }
                        }
                    }
                }
            }
        };

        expect(MapDTO.isTrackingEnabled()).toBe(true);

        map.mapEvents.dragstart();

        expect(MapDTO.isTrackingEnabled()).toBe(false);

        map.mapEvents.idle(fakeGoogleMapObject);

        expect(MapDTO.getQueryParams().neLat).toEqual(40);
        expect(MapDTO.getQueryParams().neLng).toEqual(30);
        expect(MapDTO.getQueryParams().swLat).toEqual(20);
        expect(MapDTO.getQueryParams().swLng).toEqual(10);

        var fakeModel = 'fakeModel';

        expect(map.window.model).toBe(null);
        expect(map.window.show).toBe(false);

        map.markerEvents.click(null, null, fakeModel);

        expect(map.window.model).toEqual(fakeModel);
        expect(map.window.show).toBe(true);

        var fakeWindow = {
            show: true
        };
        map.window.closeClick.call(fakeWindow);

        expect(fakeWindow.show).toBe(false);
    });

    it('should have working getter method for map object', function () {
        expect(MapDTO.getMap).toBeDefined();
        expect(MapDTO.getMap()).toBeDefined();
    });

    it('should have working getter/setter method for playerPosition object', function () {
        spyOn(MapDTO, 'setMapCenterByPlayer');

        expect(MapDTO.getPlayerPosition).toBeDefined();
        expect(MapDTO.setPlayerPosition).toBeDefined();

        expect(MapDTO.getPlayerPosition()).toEqual([]);

        MapDTO.setPlayerPosition();

        expect(MapDTO.getPlayerPosition()).toEqual([]);
        expect(MapDTO.setMapCenterByPlayer).not.toHaveBeenCalled();

        MapDTO.setPlayerPosition(mockCoordinates);

        expect(MapDTO.getPlayerPosition()[0].coords).toEqual(mockCoordinates);
        expect(MapDTO.setMapCenterByPlayer).toHaveBeenCalled();
    });

    it('should have working getter method for queryParams object', function () {
        expect(MapDTO.getQueryParams).toBeDefined();
        expect(MapDTO.getQueryParams()).toBeDefined();
    });

    it('should have working position tracking function', function () {
        MapDTO.init(function () {});
        var map = MapDTO.getMap();

        expect(MapDTO.isTrackingEnabled).toBeDefined();

        map.mapEvents.dragstart();

        expect(MapDTO.isTrackingEnabled()).toBe(false);

        spyOn(MapDTO, 'setMapCenterByPlayer');
        MapDTO.enablePositionTracking();

        expect(MapDTO.isTrackingEnabled()).toBe(true);
        expect(MapDTO.setMapCenterByPlayer).toHaveBeenCalled();
    });

    it('should have working player detection function', function () {
        MapDTO.init(function () {});

        spyOn(StorageService, 'set');
        spyOn(MapDTO, 'setPlayerPosition');

        expect(MapDTO.detectPlayerPosition).toBeDefined();

        // If there is no position
        var originalWindow = $window;
        angular.extend($window, {
            navigator: {
                geolocation: {
                    watchPosition: function(success, error) {
                        return error({
                            message: 'Error'
                        });
                    }
                }
            }
        });

        MapDTO.detectPlayerPosition();

        expect(StorageService.set).not.toHaveBeenCalled();
        expect(MapDTO.setPlayerPosition.calls.count()).toEqual(1);

        // If there is valid position
        $window = originalWindow;
        angular.extend($window, {
            navigator: {
                geolocation: {
                    watchPosition: function(success) {
                        return success({
                            coords: mockCoordinates
                        });
                    }
                }
            }
        });

        MapDTO.detectPlayerPosition();

        expect(StorageService.set).toHaveBeenCalled();
        expect(MapDTO.setPlayerPosition.calls.count()).toEqual(3);

    });

    it('should have setMapCenterByPlayer method be defined', function () {
        expect(MapDTO.setMapCenterByPlayer).toBeDefined();
    });

});

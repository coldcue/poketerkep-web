'use strict';

describe('Unit: Map - controller', function () {

    // Global variables
    var MapController, GameDTO, GameDataService, StorageService, UserAgentService, $rootScope, $httpBackend, ENV;

    // Include app
    beforeEach(angular.mock.module('angularApp'));

    // Include test related dependencies
    beforeEach(angular.mock.inject(function(_$controller_, _GameDTO_, _GameDataService_, _StorageService_,
                                            _UserAgentService_, _$rootScope_, _$httpBackend_, _ENV_) {
        GameDTO = _GameDTO_;
        GameDataService = _GameDataService_;
        StorageService = _StorageService_;
        UserAgentService = _UserAgentService_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        ENV = _ENV_;

        spyOn($rootScope, '$on');

        MapController = _$controller_('MapController', {
            $rootScope: $rootScope
        });
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(MapController).toBeDefined();
    });

    it('should have init method which automatically initializes controller', function () {
        expect(MapController.map).toBeDefined();
        expect(MapController.playerPosition).toBeDefined();

        $rootScope.$broadcast('updateGameData');

        expect($rootScope.$on).toHaveBeenCalled();
    });

    it('should have working getGameData method to load game data from backend', function () {
        expect(MapController.getGameData).toBeDefined();

        $httpBackend.expectGET(/game/).respond(200, {});
        $httpBackend.expectGET(/header/).respond();
        $httpBackend.expectGET(/map/).respond();

        spyOn(GameDataService, 'get').and.callThrough();
        spyOn(GameDTO, 'setRAWGame');
        spyOn(MapController, 'setMapData');

        MapController.getGameData();
        MapController.getGameData();

        $httpBackend.flush();

        expect(GameDataService.get).toHaveBeenCalled();
        expect(GameDTO.setRAWGame).toHaveBeenCalled();
        expect(MapController.setMapData).toHaveBeenCalled();
    });

    it('should have non working getGameData method if maintenance mode is enabled', function () {
        expect(MapController.getGameData).toBeDefined();

        ENV.maintenance = true;

        spyOn(GameDataService, 'get').and.callThrough();
        spyOn(GameDTO, 'setRAWGame');
        spyOn(MapController, 'setMapData');

        MapController.getGameData();

        expect(GameDataService.get).not.toHaveBeenCalled();
        expect(GameDTO.setRAWGame).not.toHaveBeenCalled();
        expect(MapController.setMapData).not.toHaveBeenCalled();
    });

    it('should have working setMapData method to set viewModel map variables', function () {
        expect(MapController.setMapData).toBeDefined();

        var fakeFilteredGame = {
            gyms: 'test',
            pokemons: 'test',
            pokestops: 'test'
        };

        spyOn(GameDTO, 'getGame').and.callFake(function() {
            return fakeFilteredGame;
        });

        MapController.setMapData();

        expect(GameDTO.getGame).toHaveBeenCalled();
        expect(MapController.gyms).toEqual(fakeFilteredGame.gyms);
        expect(MapController.pokemons).toEqual(fakeFilteredGame.pokemons);
        expect(MapController.pokestops).toEqual(fakeFilteredGame.pokestops);
    });

    it('should have working showHomeScreenPopup method', function () {
        expect(MapController.showHomeScreenPopup).toBeDefined();

        // if user visits page first time
        spyOn(StorageService, 'get').and.returnValue(undefined);
        spyOn(StorageService, 'set');

        MapController.showHomeScreenPopup();

        expect(StorageService.set).toHaveBeenCalled();
        expect(MapController.homeScreenPopup).toBe(false);

        // if user visits from Android device
        StorageService.get.and.returnValue('firstTime');
        spyOn(UserAgentService, 'isAndroid').and.returnValue(true);

        MapController.showHomeScreenPopup();

        expect(UserAgentService.isAndroid).toHaveBeenCalled();
        expect(MapController.homeScreenPopup).toBe('Android');

        // if user visits from iOS device
        UserAgentService.isAndroid.and.returnValue(false);
        spyOn(UserAgentService, 'isMobileSafari').and.returnValue(true);

        MapController.showHomeScreenPopup();

        expect(UserAgentService.isMobileSafari).toHaveBeenCalled();
        expect(MapController.homeScreenPopup).toBe('iOS');

        // if user already closed home screen popup
        StorageService.get.and.returnValue(false);
        spyOn(MapController, 'hideHomeScreenPopup');

        MapController.showHomeScreenPopup();

        expect(MapController.hideHomeScreenPopup).toHaveBeenCalled();
    });

    it('should have working hideHomeScreenPopup method', function () {
        expect(MapController.hideHomeScreenPopup).toBeDefined();

        spyOn(StorageService, 'set');

        MapController.hideHomeScreenPopup();

        expect(MapController.homeScreenPopup).toBe(false);
        expect(StorageService.set).toHaveBeenCalled();
    });

});

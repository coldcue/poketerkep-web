'use strict';

describe('Unit: LeftMenu - controller', function () {

    // Global variables
    var LeftMenuController, GameDTO, $rootScope, $window, $timeout, $httpBackend, originalWindow;

    // Include app
    beforeEach(angular.mock.module('angularApp'));

    // Include test related dependencies
    beforeEach(angular.mock.inject(function(_$controller_, _GameDTO_, _$rootScope_, _$window_, _$timeout_,
                                            _$httpBackend_) {
        GameDTO = _GameDTO_;
        $rootScope = _$rootScope_;
        $window = _$window_;
        originalWindow = $window;
        $timeout = _$timeout_;
        $httpBackend = _$httpBackend_;

        LeftMenuController = _$controller_('LeftMenuController');
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(LeftMenuController).toBeDefined();
    });

    it('should have init method which automatically initializes controller', function () {
        expect(LeftMenuController.filterStates).toBeDefined();
        expect(LeftMenuController.selectedPokemons).toBeDefined();
    });

    it('should have facebookInit method which not calls FB api if window.FB is not initialized', function () {
        var fbSpy = jasmine.createSpy('FB');

        $httpBackend.expectGET(/header/).respond(200);
        $httpBackend.expectGET(/map/).respond(200);

        $window = originalWindow;
        angular.extend($window, {
            FB: undefined
        });

        LeftMenuController.facebookInit();

        $httpBackend.flush();

        expect(fbSpy).not.toHaveBeenCalled();
    });

    it('should have facebookInit method which calls FB api', function () {
        var fbSpy = jasmine.createSpy('FB');

        $httpBackend.expectGET(/header/).respond(200);
        $httpBackend.expectGET(/map/).respond(200);

        $window = originalWindow;
        angular.extend($window, {
            FB: {
                XFBML: {
                    parse: fbSpy
                }
            }
        });

        LeftMenuController.facebookInit();

        $timeout.flush();
        $httpBackend.flush();

        expect(fbSpy).toHaveBeenCalled();
    });

    it('should have setFilters method which modifies GameDTO filterStates and updates game data', function () {
        expect(LeftMenuController.setFilters).toBeDefined();

        spyOn(GameDTO, 'setFilterStates');
        spyOn(GameDTO, 'setSelectedPokemons');
        spyOn($rootScope, '$broadcast');

        LeftMenuController.setFilters();

        expect(GameDTO.setFilterStates).toHaveBeenCalledWith(LeftMenuController.filterStates);
        expect(GameDTO.setSelectedPokemons).toHaveBeenCalledWith(LeftMenuController.selectedPokemons);
        expect($rootScope.$broadcast).toHaveBeenCalledWith('updateGameData');
    });

});

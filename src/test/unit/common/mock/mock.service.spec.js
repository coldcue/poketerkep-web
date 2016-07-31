'use strict';

describe('Unit: Mock - service', function () {

    // Global variables
    var MockService, GameDataService;

    // Include app
    beforeEach(angular.mock.module('angularApp'));

    // Include test related dependencies
    beforeEach(angular.mock.inject(function (_MockService_, _GameDataService_) {
        MockService = _MockService_;
        GameDataService = _GameDataService_;
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(MockService).toBeDefined();
        expect(MockService.passThrough).toBeDefined();
    });

    it('should have working gameMock', function () {
        MockService.gameMock();
        expect(MockService.gameMock).toBeDefined();
    });

});

'use strict';

describe('Unit: Game - data-service', function () {

    // Global variables
    var GameDataService;

    // Include app
    beforeEach(angular.mock.module('angularApp'));

    // Include test related dependencies
    beforeEach(angular.mock.inject(function (_GameDataService_) {
        GameDataService = _GameDataService_;
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(GameDataService).toBeDefined();
    });

});

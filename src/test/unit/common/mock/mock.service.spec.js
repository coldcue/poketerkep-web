'use strict';

describe('Unit: Mock - service', function () {

    // Global variables
    var MockService, GameDataService, $httpBackend;

    // Include app
    beforeEach(angular.mock.module('angularApp'));

    // Include test related dependencies
    beforeEach(angular.mock.inject(function (_MockService_, _GameDataService_, _$httpBackend_) {
        MockService = _MockService_;
        GameDataService = _GameDataService_;
        $httpBackend = _$httpBackend_;
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(MockService).toBeDefined();
        expect(MockService.passThrough).toBeDefined();
    });

});

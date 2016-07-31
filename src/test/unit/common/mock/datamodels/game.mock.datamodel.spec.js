'use strict';

describe('Unit: GameMock - datamodel', function () {

    // Global variables
    var GameMockDataModel;

    // Include app
    beforeEach(angular.mock.module('angularApp'));

    // Include test related dependencies
    beforeEach(angular.mock.inject(function (_GameMockDataModel_) {
        GameMockDataModel = _GameMockDataModel_;
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(GameMockDataModel).toBeDefined();
    });

    it('should have working getter/setter methods', function () {
        expect(GameMockDataModel.getData).toBeDefined();
        expect(GameMockDataModel.setData).toBeDefined();

        GameMockDataModel.setData('fake');

        expect(GameMockDataModel.getData()).toEqual('fake');
    });

    it('should have working findAll method', function () {
        expect(GameMockDataModel.findAll).toBeDefined();

        GameMockDataModel.setData('fake');

        expect(GameMockDataModel.findAll()).toEqual('fake');
    });

});


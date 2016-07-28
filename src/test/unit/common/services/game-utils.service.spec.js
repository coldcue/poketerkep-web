'use strict';

describe('Unit: GameUtils - service', function () {

    var gameUtilsService;

    beforeEach(angular.mock.module('angularApp'));

    beforeEach(angular.mock.inject(function(GameUtilsService) {
        gameUtilsService = GameUtilsService;
    }));

    it('should have GameUtilsService be defined', function () {
        expect(gameUtilsService).toBeDefined();
    });

});

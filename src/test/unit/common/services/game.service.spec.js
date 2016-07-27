'use strict';

describe('Unit: Game - service', function () {

    var gameService;

    beforeEach(angular.mock.module('angularApp'));

    beforeEach(angular.mock.inject(function(GameService) {
        gameService = GameService;
    }));

    it('should have GameService be defined', function () {
        expect(gameService).toBeDefined();
    });

});

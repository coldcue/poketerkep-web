'use strict';

describe('Unit: Map - controller', function () {

    var controller;

    beforeEach(angular.mock.module('angularApp'));

    beforeEach(angular.mock.inject(function($controller) {
        controller = $controller('MapController');
    }));

    it('should have MapController be defined', function () {
        expect(controller).toBeDefined();
    });

});

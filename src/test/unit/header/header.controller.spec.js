'use strict';

describe('Unit: Header - controller', function () {

    var controller;

    beforeEach(angular.mock.module('angularApp'));

    beforeEach(angular.mock.inject(function($controller) {
        controller = $controller('HeaderController');
    }));

    it('should have HeaderController be defined', function () {
        expect(controller).toBeDefined();
    });

});

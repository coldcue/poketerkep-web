'use strict';

describe('Unit: Footer - controller', function () {

    var controller;

    beforeEach(angular.mock.module('angularApp'));

    beforeEach(angular.mock.inject(function($controller) {
        controller = $controller('FooterController');
    }));

    it('should have FooterController be defined', function () {
        expect(controller).toBeDefined();
    });

});

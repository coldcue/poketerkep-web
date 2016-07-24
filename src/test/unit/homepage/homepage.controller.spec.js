'use strict';

describe('Unit: Homepage - controller', function () {

    var controller;

    beforeEach(angular.mock.module('angularApp'));

    beforeEach(angular.mock.inject(function($controller) {
        controller = $controller('HomepageController');
    }));

    it('should have HomepageController be defined', function () {
        expect(controller).toBeDefined();
    });

});

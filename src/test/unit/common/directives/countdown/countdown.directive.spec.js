'use strict';

describe('Unit: Countdown - directive', function () {

    // Global variables
    var $scope, $compile, $httpBackend, element, moment;

    // Compile directive function
    function compileDirective(template) {
        var element = angular.element(template);
        var compiledElement = $compile(element)($scope);
        $scope.$digest();
        return compiledElement;
    }

    // Include app
    beforeEach(angular.mock.module('angularApp'));

    // Include test related dependencies
    beforeEach(angular.mock.inject(function (_$rootScope_, _$compile_, _$httpBackend_, _moment_) {
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
        $httpBackend = _$httpBackend_;
        moment = _moment_;

        $scope.time = moment().add(2, 'hours');

        $httpBackend.expectGET(/views\/loader/).respond(200);

        element = compileDirective('<span countdown="time"></span>');
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(element).toBeDefined();
    });

    it('should have countdown displayed if time is in the future', function () {
        expect(element.html()).toMatch(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/);

        $scope.time = moment().add(8, 'hours').add(8, 'minutes').add(8, 'seconds');
        $scope.$digest();

        expect(element.html()).toMatch(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/);

        $scope.time = moment().add(20, 'seconds');
        $scope.$digest();
        
        expect(element.html()).toMatch(/^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/);
    });

    it('should have - displayed if time is in the past', function () {
        $scope.time = moment().subtract(2, 'hours');
        $scope.$digest();

        expect(element.html()).toEqual('-');
    });

    it('should have nothing displayed if time is not defined', function () {
        var element2 = compileDirective('<span countdown></span>');

        expect(element2.html()).toEqual('');
    });

});

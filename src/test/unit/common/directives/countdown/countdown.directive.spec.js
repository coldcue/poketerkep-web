'use strict';

describe('Unit: Countdown - directive', function () {

    // Global variables
    var $scope, $compile, $interval, $httpBackend, element, moment;

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
    beforeEach(angular.mock.inject(function (_$rootScope_, _$compile_, _$interval_, _$httpBackend_, _moment_) {
        $scope = _$rootScope_.$new();
        $compile = _$compile_;
        $interval = _$interval_;
        $httpBackend = _$httpBackend_;
        moment = _moment_;

        $scope.time = moment().add(2, 'hours');

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

    it('should have not working display function if futureDate is not defined', function () {
        $scope.futureDate = undefined;

        expect($scope.displayCountdown()).not.toBeDefined();
    });

    it('should have interval which calls display function in every second', function () {
        spyOn($scope, 'displayCountdown');

        $httpBackend.expectGET(/header/).respond(200);
        $httpBackend.expectGET(/map/).respond(200);

        $interval.flush(1000);

        expect($scope.displayCountdown).toHaveBeenCalled();
        expect($scope.displayCountdown.calls.count()).toEqual(1);

        $interval.flush(2000);

        expect($scope.displayCountdown.calls.count()).toEqual(3);

        $httpBackend.flush();
    });

});

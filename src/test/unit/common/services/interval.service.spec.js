'use strict';

describe('Unit: Interval - service', function () {

    // Global variables
    var IntervalService, ENV, $interval;

    // Include app
    beforeEach(angular.mock.module('angularApp'));

    // Include test related dependencies
    beforeEach(angular.mock.inject(function (_IntervalService_, _ENV_, _$interval_) {
        IntervalService = _IntervalService_;
        ENV = _ENV_;
        $interval = _$interval_;
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(IntervalService).toBeDefined();
    });

    it('should have working stopInterval method', function () {
        expect(IntervalService.stopInterval).toBeDefined();
        expect(IntervalService.stopInterval()).toBe(false);

        var fakeFunction = function() {};
        IntervalService.startInterval(fakeFunction);

        expect(IntervalService.stopInterval()).toBe(true);
    });

    it('should have working startInterval method', function () {
        expect(IntervalService.startInterval).toBeDefined();
        expect(IntervalService.startInterval()).toBeDefined();
    });

    it('should have working restartInterval method', function () {
        expect(IntervalService.restartInterval).toBeDefined();

        spyOn(IntervalService, 'stopInterval');
        spyOn(IntervalService, 'startInterval');

        var fakeFunction = function() {};
        IntervalService.restartInterval(fakeFunction);

        expect(IntervalService.stopInterval).toHaveBeenCalled();
        expect(IntervalService.startInterval).toHaveBeenCalledWith(fakeFunction);
    });

});

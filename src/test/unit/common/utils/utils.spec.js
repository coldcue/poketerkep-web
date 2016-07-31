'use strict';

describe('Unit: Utils', function () {

    // Global variables
    var Utils;

    // Include app
    beforeEach(angular.mock.module('angularApp'));

    // Include test related dependencies
    beforeEach(angular.mock.inject(function (_Utils_) {
        Utils = _Utils_;
    }));

    /**
     * TEST CASES:
     */

    it('should be defined', function () {
        expect(Utils).toBeDefined();
    });

    it('should have working compareByName method', function () {
        var object1 = {
            id: 1,
            name: 'name1'
        };

        var object2 = {
            id: 2,
            name: 'name2'
        };

        expect(Utils.compareByName(object1, object2)).toEqual(-1);
        expect(Utils.compareByName(object2, object1)).toEqual(1);
        expect(Utils.compareByName(object1, object1)).toEqual(0);
    });

});

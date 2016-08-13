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

    it('should encode Pokemon Ids To Base64', function () {
        var input = [0, 1, 3, 5, 31, 32, 33, 67, 87, 161, 23, 55, 66, 88, 98, 400, 543, 654, 721, 722];
        var expected = 'KwCAgAMAgAAMAIABBAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAQAAAAAAAAAAABg==';

        expect(Utils.encodePokemonIdsToBase64(input)).toMatch(expected);
    });

});

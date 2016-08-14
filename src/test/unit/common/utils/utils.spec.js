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

    it('should have working encodePokemonIdsToBase64 method', function () {
        var input = [0, 1, 3, 5, 31, 32, 33, 67, 87, 161, 23, 55, 66, 88, 98, 400, 543, 654, 721, 722];
        var expected = 'KwCAgAMAgAAMAIABBAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAIAAA' +
            'AAAAAAAAAAAAAAAQAAAAAAAAAAABg==';

        expect(Utils.encodePokemonIdsToBase64(input)).toEqual(expected);
    });

    it('should have working queryStringToJSON method', function () {
        var url1 = 'http://asd.hu';
        var url2 = 'http://asd.hu/?a=1';
        var url3 = 'http://asd.hu/?a=1&b=abc&c=&d=2,3,4';

        expect(Utils.queryStringToJSON(url1)).toEqual({});
        expect(Utils.queryStringToJSON(url2)).toEqual({a: 1});
        expect(Utils.queryStringToJSON(url3)).toEqual({a: 1, b: 'abc', c: '', d: '2,3,4'});
    });

    it('should have working base64ArrayBuffer method', function () {
        expect(Utils.base64ArrayBuffer([0, 1])).toEqual('AAE=');
        expect(Utils.base64ArrayBuffer([0, 1, 2])).toEqual('AAEC');
    });

    it('should have working parseNumberWithoutRounding method', function () {
        expect(Utils.parseNumberWithoutRounding(0, 0)).toEqual(0);
        expect(Utils.parseNumberWithoutRounding(-10, 0)).toEqual(-10);
        expect(Utils.parseNumberWithoutRounding(-10.5555, 0)).toEqual(-10);
        expect(Utils.parseNumberWithoutRounding(-10.5555, 1)).toEqual(-10.5);
        expect(Utils.parseNumberWithoutRounding(-10.55, 2)).toEqual(-10.55);
        expect(Utils.parseNumberWithoutRounding(-10.5555, 4)).toEqual(-10.5555);
        expect(Utils.parseNumberWithoutRounding(10.5555, 0)).toEqual(10);
        expect(Utils.parseNumberWithoutRounding(10.5555, 1)).toEqual(10.5);
        expect(Utils.parseNumberWithoutRounding(10.55, 2)).toEqual(10.55);
        expect(Utils.parseNumberWithoutRounding(10.5555, 4)).toEqual(10.5555);
        expect(Utils.parseNumberWithoutRounding(0)).toEqual(0);
        expect(Utils.parseNumberWithoutRounding(-10)).toEqual(-10);
        expect(Utils.parseNumberWithoutRounding(10.55)).toEqual(10);
    });

});

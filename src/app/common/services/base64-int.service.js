'use strict';

angular
    .module('angularApp')
    .factory('Base64IntService', Base64IntService);

/**
 * Base64Int service to encode and decode ints from/to base64
 */
/*@ngInject*/
function Base64IntService() {

    var base64IntService = {
        fromInt: fromInt,
        toInt: toInt
    };

    // Init digits and maps
    var digitsStr = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+-';
    var digits = digitsStr.split('');
    var digitsMap = {};

    for (var i = 0; i < digits.length; i++) {
        digitsMap[digits[i]] = i;
    }

    /**
     * Base64 encode from int32
     * @param int32 - integer value
     */
    function fromInt(int32) {
        var result = '';

        while (true) {
            /*jshint bitwise: false*/
            result = digits[int32 & 0x3f] + result;
            int32 >>>= 6;

            if (int32 === 0) {
                break;
            }
        }

        return result;
    }

    /**
     * Base64 decode from digitsStr
     * @param digitsStr - encoded string
     */
    function toInt(digitsStr) {
        var result = 0;
        var digits = digitsStr.split('');

        for (var i = 0; i < digits.length; i++) {
            /*jshint bitwise: false*/
            result = (result << 6) + digitsMap[digits[i]];
        }

        return result;
    }

    return base64IntService;

}

'use strict';

angular
    .module('angularApp')
    .factory('Utils', Utils);

/**
 * Utility functions
 */
/*@ngInject*/
function Utils() {

    var utils = {
        compareByName: compareByName,
        encodePokemonIdsToBase64: encodePokemonIdsToBase64,
        queryStringToJSON: queryStringToJSON,
        base64ArrayBuffer: base64ArrayBuffer,
        parseNumberWithoutRounding: parseNumberWithoutRounding
    };

    /**
     * Compares two object by name
     * Helper function for array.sort(), ascending sorting
     */
    function compareByName(a, b) {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    }

    /**
     * Encode an int array to base64
     * @param pokemonIds - int array
     */
    function encodePokemonIdsToBase64(pokemonIds) {
        /*jshint camelcase: false */
        // The offset before each 8 bit segments
        var offset = 0;
        var bytes = new Int8Array(91);

        // Iterate over 91 bytes. We need 91 bytes, so we have 91 * 8 = 728 maximum pokemon id, which is more than 721
        for (var byte_idx = 0; byte_idx < 91; byte_idx++) {
            var byte_value = 0;

            // Get the pokemons between the offset and offest+7
            var start = offset;
            var end = offset + 7;

            for (var p_idx = 0; p_idx < pokemonIds.length; p_idx++) {
                var pokemon_id = pokemonIds[p_idx];

                if (pokemon_id >= start && pokemon_id <= end) {
                    //Add the 2^pokemon_id to the segment value
                    byte_value += Math.pow(2, pokemon_id - offset);
                }
            }

            offset += 8;
            bytes[byte_idx] = byte_value;
        }

        //Convert byte array to base64
        return utils.base64ArrayBuffer(bytes);
    }

    /**
     * Turn query string from url into JSON
     * @param url - full url with ?param=...
     */
    function queryStringToJSON(url) {
        var query = {};
        var a = url.split('?');

        if(a.length > 1) {
            var b = a[1].split('&');

            for (var i = 0; i < b.length; i++) {
                var c = b[i].split('=');
                var d = decodeURIComponent(c[1] || '');
                query[decodeURIComponent(c[0])] =
                    (Number(d) !== Number.NaN && Number(d).toString() === d ? Number(d) : d);
            }
        }

        return query;
    }

    /**
     * Converts an array buffer to base64 string - https://gist.github.com/jonleighton/958841
     * @param arrayBuffer
     * @returns {string}
     */
    function base64ArrayBuffer(arrayBuffer) {
        /* jshint ignore:start */
        var base64 = '';
        var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

        var bytes = new Uint8Array(arrayBuffer);
        var byteLength = bytes.byteLength;
        var byteRemainder = byteLength % 3;
        var mainLength = byteLength - byteRemainder;

        var a, b, c, d;
        var chunk;

        // Main loop deals with bytes in chunks of 3
        for (var i = 0; i < mainLength; i = i + 3) {
            // Combine the three bytes into a single integer
            chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];

            // Use bitmasks to extract 6-bit segments from the triplet
            a = (chunk & 16515072) >> 18; // 16515072 = (2^6 - 1) << 18
            b = (chunk & 258048) >> 12; // 258048   = (2^6 - 1) << 12
            c = (chunk & 4032) >> 6; // 4032     = (2^6 - 1) << 6
            d = chunk & 63;               // 63       = 2^6 - 1

            // Convert the raw binary segments to the appropriate ASCII encoding
            base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
        }

        // Deal with the remaining bytes and padding
        if (byteRemainder == 1) {
            chunk = bytes[mainLength];

            a = (chunk & 252) >> 2; // 252 = (2^6 - 1) << 2

            // Set the 4 least significant bits to zero
            b = (chunk & 3) << 4; // 3   = 2^2 - 1

            base64 += encodings[a] + encodings[b] + '==';
        } else if (byteRemainder == 2) {
            chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];

            a = (chunk & 64512) >> 10; // 64512 = (2^6 - 1) << 10
            b = (chunk & 1008) >> 4; // 1008  = (2^6 - 1) << 4

            // Set the 2 least significant bits to zero
            c = (chunk & 15) << 2; // 15    = 2^4 - 1

            base64 += encodings[a] + encodings[b] + encodings[c] + '=';
        }

        return base64;
        /* jshint ignore:end */
    }

    /**
     * Parse number with specified decimal places without rounding it
     * @param n - number
     * @param decimalPlaces - decimal places
     */
    function parseNumberWithoutRounding(n, decimalPlaces) {
        if(angular.isUndefinedOrNull(decimalPlaces)) {
            decimalPlaces = 0;
        }

        return Number(n.toString().match(new RegExp('^\\-?\\d+(?:\\.\\d{0,' + decimalPlaces + '})?')));
    }

    return utils;

}

/**
 * Check if value is undefined or null
 * @param value
 */
angular.isUndefinedOrNull = function (value) {
    return angular.isUndefined(value) || value === null;
};

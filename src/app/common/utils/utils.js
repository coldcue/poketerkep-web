'use strict';

angular
    .module('angularApp')
    .factory('Utils', Utils);

/**
 * Utility functions
 */
/*@ngInject*/
function Utils(Base64IntService) {

    return {
        compareByName: compareByName,
        encodeIntArrayToBase64Segments: encodeIntArrayToBase64Segments,
        decodeBase64SegmentsToIntArray: decodeBase64SegmentsToIntArray,
        queryStringToJSON: queryStringToJSON
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
     * Encode an int array to base64 segments
     * @param array - int array
     */
    function encodeIntArrayToBase64Segments(array) {
        // The offset before each 32 bit segments
        var offset = 0;
        var segments = [];

        // Iterate over 24 segments. We need 24 segments, so we have 32 * 24 = 786 maximum element
        for (var segIdx = 0; segIdx < 6; segIdx++) {
            var segValue = 0;

            // Get the elements between the offset and offset + 31
            var start = offset;
            var end = offset + 31;

            for (var pIdx = 0; pIdx < array.length; pIdx++) {
                var element = array[pIdx];

                if (element >= start && element <= end) {
                    //Add the 2^element to the segment value
                    segValue += Math.pow(2, element - offset);
                }
            }

            offset += 32;

            segments.push(Base64IntService.fromInt(segValue));
        }

        return segments;
    }

    /**
     * Decode base64 segments into int array
     * @param segments - base64 segments
     */
    function decodeBase64SegmentsToIntArray(segments) {
        // The offset before each 32 bit segments
        var offset = 0;
        var array = [];

        // Iterate over 24 segments. We need 24 segments, so we have 32 * 24 = 786 maximum element
        for (var segIdx = 0; segIdx < segments.length; segIdx++) {
            var segValue = Base64IntService.toInt(segments[segIdx]);

            for (var i = 0; i < 32; i++) {
                // Mask out other bits
                /*jshint bitwise: false*/
                if ((segValue & Math.pow(2, i)) !== 0) {
                    // If its set
                    array.push(offset + i);
                }
            }

            offset += 32;
        }

        return array;
    }

    /**
     * Turn query string from url into JSON
     * @param url - full url with ?param=...
     */
    function queryStringToJSON(url) {
        var query = {};
        var a = url.split('?')[1].split('&');

        for (var i = 0; i < a.length; i++) {
            var b = a[i].split('=');
            query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || '');
        }

        return query;
    }

}

/**
 * Check if value is undefined or null
 * @param value
 */
angular.isUndefinedOrNull = function (value) {
    return angular.isUndefined(value) || value === null;
};

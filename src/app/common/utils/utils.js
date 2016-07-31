'use strict';

angular
    .module('angularApp')
    .factory('Utils', Utils);

/**
 * Utility functions
 */
/*@ngInject*/
function Utils() {

    return {
        compareByName: compareByName
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

}

/**
 * Check if value is undefined or null
 * @param value
 */
angular.isUndefinedOrNull = function (value) {
    return angular.isUndefined(value) || value === null;
};

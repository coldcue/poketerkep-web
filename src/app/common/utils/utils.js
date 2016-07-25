'use strict';

angular
    .module('angularApp')
    .factory('Utils', Utils);

/**
 * Utility functions
 */
/*@ngInject*/
function Utils() {

}

/**
 * Check if value is undefined or null
 * @param value
 */
angular.isUndefinedOrNull = function (value) {
    return angular.isUndefined(value) || value === null;
};

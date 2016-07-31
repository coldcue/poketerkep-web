'use strict';

angular
    .module('angularApp')
    .factory('IntervalService', IntervalService);

/**
 * Interval service to handle javascript intervals
 */
/*@ngInject*/
function IntervalService(ENV, $interval) {

    var timer;

    var intervalService = {
        startInterval: startInterval,
        stopInterval: stopInterval,
        restartInterval: restartInterval
    };

    /**
     * Start interval
     * @param func - Function which needs to be repeat
     */
    function startInterval(func) {
        timer = $interval(func, ENV.mapDefaults.refreshTime);
        return timer;
    }

    /**
     * Stop interval
     */
    function stopInterval() {
        if (!angular.isUndefinedOrNull(timer)) {
            $interval.cancel(timer);
            return true;
        }
        return false;
    }

    /**
     * Restart interval
     * @param func - Function which needs to be repeat
     */
    function restartInterval(func) {
        intervalService.stopInterval();
        return intervalService.startInterval(func);
    }

    return intervalService;

}

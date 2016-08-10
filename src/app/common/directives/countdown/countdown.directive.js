'use strict';

angular
    .module('angularApp')
    .directive('countdown', Countdown);

/**
 * Directive for contdown
 */
/*@ngInject*/
function Countdown($interval, moment) {

    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            /**
             * Convert seconds to HH:mm:ss format
             * @param input - Seconds
             */
            scope.secondsToHHmmss = function(input) {
                input = Number(input);
                var h = Math.floor(input / 3600);
                var m = Math.floor(input % 3600 / 60);
                var s = Math.floor(input % 3600 % 60);
                return ((h > 0 ? h + ':' + (m < 10 ? '0' : '') : '') + m + ':' + (s < 10 ? '0' : '') + s);
            };

            /**
             * Change countdown text
             */
            scope.displayCountdown = function() {
                if (!angular.isUndefinedOrNull(scope.futureDate)) {
                    var diff = moment.duration(scope.futureDate.diff(moment())).asSeconds();
                    return element.text(diff >= 0 ? scope.secondsToHHmmss(diff) : '-');
                }

                return undefined;
            };

            // Run display countdown function in every seconds
            $interval(function () {
                scope.displayCountdown();
            }, 1000);

            // Watch countdown attribute to detect change
            scope.$watch(attrs.countdown, function (newTime) {
                if (!angular.isUndefinedOrNull(newTime)) {
                    scope.futureDate = moment(newTime);
                    scope.displayCountdown();
                }
            });
        }
    };

}



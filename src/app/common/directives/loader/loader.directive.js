'use strict';

angular
    .module('angularApp')
    .directive('loader', Loader);

/**
 * Directive for loader
 */
/*@ngInject*/
function Loader($timeout) {

    var name = 'loader';

    return {
        templateUrl: 'views/' + name + '.tpl.html',
        restrict: 'E',
        link: function (scope, element) {
            var delay = 300;
            var timer = null;

            /* Code snippet from StackOverFlow
             * http://stackoverflow.com/questions/27842299/can-ng-show-directive-be-used-with-a-delay
             * */

            scope.displayElement = function (display) {
                if(display) {
                    element.css({'display': ''});
                } else {
                    element.css({'display': 'none'});
                }
            };

            scope.showLoading = function () {
                // If showing is already in progress just wait
                if (timer) {
                    return;
                }

                timer = $timeout(scope.displayElement.bind(this, true), delay);
                return timer;
            };

            scope.hideLoading = function () {
                // If the timer is in progress we need to cancel it to ensure everything stays in sync
                if (timer) {
                    $timeout.cancel(timer);
                }

                timer = null;

                scope.displayElement(false);
            };

            /*
             * ---------
             * */

            scope.$on('loader:Show', function() {
                scope.showLoading();
            });
            scope.$on('loader:Hide', function() {
                scope.hideLoading();
            });
        }
    };

}

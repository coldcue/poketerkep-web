'use strict';

angular
    .module('angularApp')
    .directive('maintenance', Maintenance);

/**
 * Directive for maintenance
 */
/*@ngInject*/
function Maintenance() {

    var name = 'maintenance';

    return {
        templateUrl: 'views/' + name + '.tpl.html',
        restrict: 'E',
        scope: true
    };

}
